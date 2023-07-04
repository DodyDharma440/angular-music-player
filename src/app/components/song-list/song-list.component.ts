import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Song, SongPlayer, SongState } from 'src/app/models/song.model';
import { State } from 'src/app/models/state.model';
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

  playedSongSubs: Subscription | null = null;
  playedSong: Song | null = null;
  songPlayer: SongPlayer | null = null;

  constructor(private songService: SongService, private store: Store<State>) {}

  ngOnInit(): void {
    this.playedSongSubs = this.store
      .select((store) => store.song)
      .subscribe((songs) => {
        this.playedSong = songs.song;
        this.songPlayer = songs.player;
      });
  }

  ngOnDestroy(): void {
    this.playedSongSubs?.unsubscribe();
  }

  isDisabled(song: Song) {
    return !song.preview_url;
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
