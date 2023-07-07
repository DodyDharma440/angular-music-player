import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Playlist } from 'src/app/models/playlist.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  playlistSubs!: Subscription;
  playlists: Playlist[] = [];

  constructor(
    private scrollService: InfiniteScrollService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.getPlaylists(this.scrollService.page);
  }

  ngOnDestroy(): void {
    this.playlistSubs.unsubscribe();
    this.scrollService.reset();
  }

  ngAfterViewInit(): void {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  onLoadMore() {
    this.getPlaylists(this.scrollService.page + 1);
  }

  getPlaylists(page: number) {
    this.scrollService.page = page;
    this.playlistSubs = this.spotifyService
      .getFeaturedPlaylists(this.scrollService.generateQueryParams(page))
      .pipe(
        map(({ playlists }) => {
          this.scrollService.updateTotal(playlists.total);
          return mergeRemoveDuplicates(this.playlists, playlists.items, 'id');
        })
      )
      .subscribe((data) => {
        this.playlists = data;
      });
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(this.playlists.length);
  }
}
