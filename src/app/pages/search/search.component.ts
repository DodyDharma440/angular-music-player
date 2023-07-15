import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map, tap } from 'rxjs';
import { UpdateGlobalSearch } from 'src/app/actions/global-search.action';
import { Album } from 'src/app/models/album.model';
import { SpotifyCategory } from 'src/app/models/base.model';
import {
  SearchQueries,
  SearchResponse,
  SearchResult,
  SearchResults,
} from 'src/app/models/search.model';
import { RootState } from 'src/app/models/state.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SearchService } from 'src/app/services/search.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

const initialSearchResults = {
  tracks: [],
  albums: [],
  artists: [],
  playlists: [],
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [
    InfiniteScrollService,
    {
      provide: 'perPage',
      useValue: 15,
    },
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  activeRouteSubs!: Subscription;
  searchSubs!: Subscription;

  category: SpotifyCategory = 'track';
  searchValue: string = '';

  searchResults: SearchResults = initialSearchResults;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private scrollService: InfiniteScrollService,
    private store: Store<RootState>,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.activeRouteSubs = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.scrollService.reset(false);
        this.searchResults = initialSearchResults;

        const _category = params['type'] || 'track';
        const _searchValue = params['q'] || '';

        this.category = _category;
        this.searchValue = _searchValue;
        this.store.dispatch(UpdateGlobalSearch({ payload: _searchValue }));

        this.onSearch({
          type: _category,
          value: _searchValue,
          page: this.scrollService.page,
        });
      }
    );
  }

  ngAfterViewInit() {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.activeRouteSubs.unsubscribe();
    this.searchSubs.unsubscribe();
    this.scrollService.reset();
    this.store.dispatch(UpdateGlobalSearch({ payload: '' }));
  }

  onLoadMore() {
    this.onSearch({
      type: this.category,
      value: this.searchValue,
      page: this.scrollService.page + 1,
    });
  }

  onChangeCategory = (newCategory: SpotifyCategory) => {
    this.category = newCategory;
    this.searchResults = initialSearchResults;
    this.scrollService.reset(false);
  };

  onMapAlbums(albums: Album[]): SearchResult[] {
    if (this.category === 'album') {
      return albums.map((album) => {
        const { id, name, images, artists, total_tracks } = album;
        return {
          id,
          name,
          image: images[0].url,
          owner: artists.map((a) => a.name).join(', '),
          tracksCount: total_tracks,
          detailPath: ['/album', id],
        };
      });
    }
    return [];
  }

  onSearch({
    type,
    value,
    page,
  }: Omit<SearchQueries, 'params'> & { page: number }) {
    this.scrollService.page = page;
    this.searchSubs = this.spotifyService
      .searchItems({
        type,
        value,
        params: this.scrollService.generateQueryParams(page),
      })
      .pipe(
        tap((data) => {
          this.scrollService.updateTotal(data[`${type}s`].total);
        }),
        map((data) => {
          const mappedResponse = this.searchService.mapSearchResponse(data);
          Object.entries(mappedResponse).forEach(([key, value]) => {
            mappedResponse[key as keyof SearchResults] = mergeRemoveDuplicates(
              this.searchResults[`${type}s`],
              value as SearchResult[],
              'id'
            );
          });
          return mappedResponse;
        })
      )
      .subscribe((data) => {
        this.searchResults = data;
      });
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(
      this.searchResults[`${this.category}s`].length
    );
  }

  withPluralCategory() {
    return `${this.category}s` as `${SpotifyCategory}s`;
  }

  getCategoryItems() {
    return this.searchResults[this.withPluralCategory()];
  }
}
