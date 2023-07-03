import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../models/state.model';
import { Song } from '../models/song.model';
import {
  SetPlayedSongAction,
  UpdatePlayerPayload,
  UpdatePlayerSongAction,
} from '../actions/songs.action';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private store: Store<State>) {}

  playSong(song: Song, playlists: Song[]) {
    this.store.dispatch(SetPlayedSongAction({ payload: { song, playlists } }));
  }

  getSongIndex(song: Song, playlists: Song[]) {
    const songIndex = playlists.findIndex((p) => p.id === song.id);
    return songIndex;
  }

  setPlayedSong(song: Song, playlists: Song[]) {
    this.store.dispatch(
      SetPlayedSongAction({
        payload: { song, playlists },
      })
    );
  }

  playNextSong(song: Song, playlists: Song[]) {
    const isCanNext = this.checkCanNextSong(song, playlists);
    const songIndex = this.getSongIndex(song, playlists);
    if (isCanNext) {
      this.setPlayedSong(playlists[songIndex + 1], playlists);
    }
  }

  playPrevSong(song: Song, playlists: Song[]) {
    const isCanPrev = this.checkCanPrevSong(song, playlists);
    const songIndex = this.getSongIndex(song, playlists);
    if (isCanPrev) {
      this.setPlayedSong(playlists[songIndex - 1], playlists);
    }
  }

  checkCanNextSong(song: Song, playlists: Song[]) {
    const songIndex = this.getSongIndex(song, playlists);
    return !(songIndex === playlists.length - 1);
  }

  checkCanPrevSong(song: Song, playlists: Song[]) {
    const songIndex = this.getSongIndex(song, playlists);
    return songIndex > 0;
  }

  getArtistNames(song: Song | null) {
    return (
      (song?.artists && song.artists.map((artist) => artist.name).join(', ')) ||
      'Unknown Artist'
    );
  }

  updateSongPlayer(payload: UpdatePlayerPayload) {
    this.store.dispatch(UpdatePlayerSongAction({ payload }));
  }
}
