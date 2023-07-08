import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Song, SongPlayer } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'home-current-song',
  templateUrl: './current-song.component.html',
})
export class CurrentSongComponent implements OnInit, OnDestroy {
  isPlaying = false;

  songStateSubs!: Subscription;
  song: Song | null = null;
  playlists: Song[] = [];

  songPlayer!: SongPlayer;

  constructor(
    private store: Store<RootState>,
    private songService: SongService
  ) {}

  ngOnInit() {
    this.songStateSubs = this.store
      .select((store) => store.song)
      .subscribe(({ playlists, song, player }) => {
        this.playlists = playlists;
        this.song = song;
        this.songPlayer = player;
      });
  }

  ngOnDestroy() {
    this.songStateSubs.unsubscribe();
  }

  getNames() {
    if (this.song) {
      return this.songService.getArtistNames(this.song);
    }
    return '-';
  }
}
