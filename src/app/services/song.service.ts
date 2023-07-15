import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../models/state.model';
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
  constructor(private store: Store<RootState>) {}

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

  getRandom(lists: Song[]) {
    const randomIndex = Math.floor(Math.random() * lists.length);
    return lists[randomIndex];
  }

  onShuffle(playlists: Song[], songIndex: number) {
    if (playlists.length > 1) {
      const lists = playlists.filter(
        (song, index) => song.preview_url && index !== songIndex
      );
      this.setPlayedSong(this.getRandom(lists), playlists);
    }
  }

  onPlay(
    song: Song,
    playlists: Song[],
    songIndex: number,
    type: 'increment' | 'decrement',
    isRepeatPlaylist: boolean
  ) {
    const handlePlay = (song: Song, playlists: Song[], index: number) => {
      let isCanSkip =
        type === 'increment'
          ? this.checkCanNextSong(song, playlists)
          : this.checkCanPrevSong(song, playlists);

      let _index = index;
      if (!isCanSkip && isRepeatPlaylist) {
        if (type === 'increment') {
          _index = 0;
        } else if (type === 'decrement') {
          _index = playlists.length - 1;
        }
      }

      const newSong = playlists[_index];
      const canPlay = Boolean(newSong?.preview_url);

      if (canPlay) {
        this.setPlayedSong(newSong, playlists);
        return;
      }

      const nextIndex = type === 'increment' ? index + 1 : index - 1;
      const nextSong = playlists[nextIndex];
      if (nextSong) {
        handlePlay(song, playlists, nextIndex);
      }
    };

    const index = type === 'increment' ? songIndex + 1 : songIndex - 1;
    handlePlay(song, playlists, index);
  }

  playNextSong(
    song: Song,
    playlists: Song[],
    isShuffle: boolean = false,
    isRepeatPlaylist: boolean
  ) {
    const songIndex = this.getSongIndex(song, playlists);
    if (isShuffle) {
      this.onShuffle(playlists, songIndex);
    } else {
      this.onPlay(song, playlists, songIndex, 'increment', isRepeatPlaylist);
    }
  }

  playPrevSong(
    song: Song,
    playlists: Song[],
    isShuffle: boolean = false,
    isRepeatPlaylist: boolean
  ) {
    const songIndex = this.getSongIndex(song, playlists);
    if (isShuffle) {
      this.onShuffle(playlists, songIndex);
    } else {
      this.onPlay(song, playlists, songIndex, 'decrement', isRepeatPlaylist);
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
