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
import { LikedSong, Song } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
import { InfiniteScrollService } from 'src/app/services/infinite-scroll.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  providers: [InfiniteScrollService, { provide: 'perPage', useValue: 30 }],
})
export class LikedSongsComponent implements OnInit, OnDestroy {
  @ViewChild('fetchMore') fetchMore: ElementRef<HTMLParagraphElement> | null =
    null;

  isEmpty = false;
  songSubs: Subscription | null = null;
  likedSongs: LikedSong[] = [];
  songs: Song[] = [];

  selectedSong: Song | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private store: Store<RootState>,
    public scrollService: InfiniteScrollService
  ) {}

  ngOnInit(): void {
    this.store
      .select((store) => store.likedSongs)
      .subscribe((data) => {
        if (!data.data.length && !this.isEmpty) {
          this.getLikedSongs(this.scrollService.page);
        }
        this.scrollService.updateTotal(data.total);
        this.likedSongs = data.data;
        this.songs = data.data.map((d) => d.track);
        this.scrollService.page = data.nextPage ? data.nextPage - 1 : 1;
      });
  }

  ngAfterViewInit(): void {
    this.scrollService.initIntersection(
      this.fetchMore,
      this.onLoadMore.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.songSubs?.unsubscribe();
    this.scrollService.clearIntersection();
  }

  onSelectSong(song: LikedSong) {
    this.selectedSong = song.track;
  }

  onLoadMore() {
    this.getLikedSongs(this.scrollService.page + 1);
  }

  getLikedSongs(page: number) {
    this.songSubs = this.spotifyService
      .getLikedSongs(this.scrollService.generateQueryParams(page))
      .subscribe((data) => {
        if (data.items.length === 0) {
          this.isEmpty = true;
        }

        const _songs = mergeRemoveDuplicates(
          this.likedSongs,
          data.items,
          (data, curr) => data.track.id === curr.track.id
        );

        this.store.dispatch(
          GetLikedSongsAction({
            payload: {
              data: _songs,
              total: data.total,
              nextPage: page + 1,
            },
          })
        );
      });
  }

  isCanNextPage() {
    return this.scrollService.canNextPage(this.songs.length);
  }
}
