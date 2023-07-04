import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GetLikedSongsAction } from 'src/app/actions/liked-songs.action';
import { IntersectionObserverHelper } from 'src/app/helpers/intersection.observer';
import { LikedSong, LikedSongsResponse, Song } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
})
export class LikedSongsComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  isCreateObserve = false;

  page = 1;
  perPage = 20;

  isEmpty = false;

  songSubs: Subscription | null = null;
  likedSongs: LikedSong[] = [];
  songs: Song[] = [];
  totalSongs = 0;

  selectedSong: Song | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private store: Store<RootState>,
    private intersection: IntersectionObserverHelper
  ) {}

  ngOnInit(): void {
    this.store
      .select((store) => store.likedSongs)
      .subscribe((data) => {
        if (!data.data.length && !this.isEmpty) {
          this.getLikedSongs(this.page);
        }
        this.totalSongs = data.total;
        this.likedSongs = data.data;
        this.songs = data.data.map((d) => d.track);
        this.page = data.nextPage ? data.nextPage - 1 : 1;
      });
  }

  ngOnDestroy(): void {
    this.songSubs?.unsubscribe();
  }

  onSelectSong(song: LikedSong) {
    this.selectedSong = song.track;
  }

  onLoadMore() {
    this.getLikedSongs(this.page + 1);
  }

  getLikedSongs(page: number) {
    const offset = (page - 1) * this.perPage;
    this.songSubs = this.spotifyService
      .getLikedSongs(`&offset=${offset}&limit=${this.perPage}`)
      .subscribe((data) => {
        const response = data as LikedSongsResponse;

        if (response.items.length === 0) {
          this.isEmpty = true;
        }

        const _songs = mergeRemoveDuplicates(
          this.likedSongs,
          response.items,
          (data, curr) => data.track.id === curr.track.id
        );

        if (!this.totalSongs) this.totalSongs = response.total;
        this.store.dispatch(
          GetLikedSongsAction({
            payload: {
              data: _songs,
              total: response.total,
              nextPage: page + 1,
            },
          })
        );
        this.page = page;

        if (!this.isCreateObserve && this.isCanNextPage()) {
          this.intersection
            .createAndObserve(this.fetchMore!)
            .subscribe((isIntersecting) => {
              if (isIntersecting) {
                this.onLoadMore();
              }
            });
          this.isCreateObserve = true;
        }
      });
  }

  isCanNextPage() {
    return this.totalSongs > this.songs.length;
  }
}
