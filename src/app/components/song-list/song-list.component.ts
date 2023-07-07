import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Song, SongPlayer, SongState } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
import { SongService } from 'src/app/services/song.service';
import { msToMinutes } from 'src/app/utils/time';

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent implements OnInit, OnDestroy {
  @Input() song: Song | null = null;
  @Input() playlist: Song[] = [];
  @Input() index = -1;
  @Input() album?: Album;

  playedSongSubs: Subscription | null = null;
  playedSong: Song | null = null;
  songPlayer: SongPlayer | null = null;

  constructor(
    private songService: SongService,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {
    if (this.album && this.song) {
      this.song = { ...this.song, album: this.album };
    }

    this.playedSongSubs = this.store
      .select((store) => store.song)
      .pipe(
        map((data) => {
          const _song = data.song ? { ...data.song } : null;
          if (this.album && _song) _song.album = this.album;

          let _playlist = [...data.playlists];
          if (this.album) {
            _playlist = _playlist.map((p) => {
              return { ...p, album: this.album };
            });
          }

          return { ...data, song: _song, playlists: _playlist };
        })
      )
      .subscribe((songs) => {
        this.playedSong = songs.song;
        this.songPlayer = songs.player;
      });
  }

  ngOnDestroy(): void {
    this.playedSongSubs?.unsubscribe();
  }

  isDisabled(song: Song) {
    return !song?.preview_url;
  }

  getArtistNames(song: Song) {
    return this.songService.getArtistNames(song);
  }

  onPlaySong(song: Song) {
    if (this.isActive()) {
      this.songService.updateSongPlayer(({ player }) => ({
        isPlaying: !player.isPlaying,
      }));
    } else {
      this.songService.playSong(song, this.playlist);
    }
  }

  getDuration(value: number) {
    return msToMinutes(value);
  }

  isPlaying() {
    return this.isActive() && this.songPlayer?.isPlaying;
  }

  isActive() {
    return this.song?.id === this.playedSong?.id;
  }
}
