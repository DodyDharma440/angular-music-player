import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Playlist } from 'src/app/models/playlist.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  routeSubs!: Subscription;
  categorySubs!: Subscription;
  playlistsSubs!: Subscription;

  category: Category | null = null;
  categoryId = '';

  playlists: Playlist[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private scrollService: InfiniteScrollService
  ) {}

  ngOnInit(): void {
    this.routeSubs = this.activatedRoute.params.subscribe((params) => {
      this.scrollService.reset(false);

      const _categoryId = params['id'];
      this.categoryId = _categoryId;
      this.getCategory(_categoryId);
      this.getPlaylists(this.scrollService.page, _categoryId);
    });
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
    this.categorySubs.unsubscribe();
    this.playlistsSubs.unsubscribe();
    this.scrollService.reset();
  }

  ngAfterViewInit(): void {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  onLoadMore() {
    this.getPlaylists(this.scrollService.page + 1, this.categoryId);
  }

  getCategory(id: string) {
    this.categorySubs = this.spotifyService.getCategory(id).subscribe((res) => {
      this.category = res;
    });
  }

  getPlaylists(page: number, id: string) {
    this.scrollService.page = page;
    this.playlistsSubs = this.spotifyService
      .getCategoryPlaylists(id, this.scrollService.generateQueryParams(page))
      .pipe(
        tap((res) => this.scrollService.updateTotal(res.playlists.total)),
        map((res) =>
          mergeRemoveDuplicates(this.playlists, res.playlists.items, 'id')
        )
      )
      .subscribe((data) => {
        this.playlists = data;
      });
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(this.playlists.length);
  }
}
