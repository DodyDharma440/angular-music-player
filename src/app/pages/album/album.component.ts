import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, map, reduce } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
})
export class AlbumComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  albumSubs!: Subscription;
  albums: Album[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private scrollService: InfiniteScrollService
  ) {}

  ngOnInit(): void {
    this.getAlbums(this.scrollService.page);
  }

  ngOnDestroy(): void {
    this.albumSubs.unsubscribe();
    this.scrollService.reset();
  }

  ngAfterViewInit(): void {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  onLoadMore() {
    this.getAlbums(this.scrollService.page + 1);
  }

  getAlbums(page: number) {
    this.scrollService.page = page;
    this.albumSubs = this.spotifyService
      .getNewAlbums(this.scrollService.generateQueryParams(page))
      .pipe(
        map(({ albums }) => {
          this.scrollService.updateTotal(albums.total);
          return mergeRemoveDuplicates(this.albums, albums.items, 'id');
        })
      )
      .subscribe((data) => {
        this.albums = data;
      });
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(this.albums.length);
  }

  getArtistNames(artists: Artist[]) {
    return `by ${
      artists.map((artist) => artist.name).join(', ') || 'Unknown Artist'
    }`;
  }
}
