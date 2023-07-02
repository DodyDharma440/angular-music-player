import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GetLikedSongsAction } from 'src/app/actions/songs.action';
import { LikedSong, LikedSongsResponse, Song } from 'src/app/models/song.model';
import { State } from 'src/app/models/state.model';
import { SongService } from 'src/app/services/song.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { msToMinutes } from 'src/app/utils/time';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
})
export class LikedSongsComponent implements OnInit, OnDestroy {
  page = 1;
  perPage = 20;

  isEmpty = false;

  songSubs: Subscription | null = null;
  songs: LikedSong[] = [];
  totalSongs = 0;

  selectedSong: Song | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private store: Store<State>,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.store
      .select((store) => store.songs.likedSongs)
      .subscribe((data) => {
        if (!data.data.length && !this.isEmpty) {
          this.getLikedSongs(this.page);
        }
        this.totalSongs = data.total;
        this.songs = data.data;
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

        const _songs = [...this.songs, ...response.items];
        const reducedSongs = _songs.reduce((prev: LikedSong[], curr) => {
          const isExist = prev.some((p) => p.track.id === curr.track.id);
          if (!isExist) {
            prev.push(curr);
          }
          return prev;
        }, []);

        if (!this.totalSongs) this.totalSongs = response.total;
        this.store.dispatch(
          GetLikedSongsAction({
            payload: {
              data: reducedSongs,
              total: response.total,
              nextPage: page + 1,
            },
          })
        );
        this.page = page;
      });
  }

  getArtistNames(song: Song) {
    return song.artists.map((artist) => artist.name).join(', ');
  }

  getDuration(value: number) {
    return msToMinutes(value);
  }

  isDisabled(song: Song) {
    return !song.preview_url;
  }

  isCanNextPage() {
    return this.totalSongs > this.songs.length;
  }

  onPlaySong(song: Song) {
    this.songService.playSong(
      song,
      this.songs.map((s) => s.track)
    );
  }
}
