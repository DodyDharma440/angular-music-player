import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../models/state.model';
import { Song, SongPlaylist } from '../models/song.model';
import {
  SetPlayedSongAction,
  UpdatePlayerPayload,
  UpdatePlayerSongAction,
} from '../actions/songs.action';

type PlaySongOptions = {
  assignOrderId?: boolean;
  isShuffle?: boolean;
  autoPlay?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class SongService {
  @ViewChild('musicPlayer') audioRef: ElementRef<HTMLAudioElement> | null =
    null;

  constructor(private store: Store<RootState>) {}

  playSong(song: Song, playlists: Song[], options?: PlaySongOptions) {
    let _playlist = playlists as SongPlaylist[];
    if (options?.assignOrderId) {
      _playlist = playlists
        .filter((p) => p.preview_url)
        .map((p, index: number) => ({ ...p, orderId: index + 1 }));
    }

    if (options?.isShuffle) {
      _playlist = this.shufflePlaylist(_playlist);
    }

    const autoPlay =
      typeof options?.autoPlay === 'undefined' ? true : options.autoPlay;

    if (autoPlay) {
      const audioElement = document.getElementById(
        'musicPlayer'
      ) as HTMLAudioElement | null;
      if (audioElement) audioElement.autoplay = true;
    }

    this.store.dispatch(
      SetPlayedSongAction({
        payload: {
          song,
          playlists: _playlist,
          autoPlay,
        },
      })
    );
  }

  shufflePlaylist(playlist: SongPlaylist[]) {
    return playlist
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  toggleShuffle(song: Song, playlist: SongPlaylist[], toShuffle: boolean) {
    if (toShuffle) {
      const shuffled = this.shufflePlaylist(playlist);
      this.playSong(song, shuffled, { autoPlay: false });
    } else {
      const sorted = playlist
        .map((p) => p)
        .sort((a, b) => a.orderId - b.orderId);
      this.playSong(song, sorted, { autoPlay: false });
    }
  }

  getSongIndex(song: Song, playlists: Song[]) {
    const songIndex = playlists.findIndex((p) => p.id === song.id);
    return songIndex;
  }

  getRandom(lists: Song[]) {
    const randomIndex = Math.floor(Math.random() * lists.length);
    return lists[randomIndex];
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
        this.playSong(newSong, playlists);
        return;
      }

      const nextIndex = type === 'increment' ? index + 1 : index - 1;
      handlePlay(song, playlists, nextIndex);
    };

    const index = type === 'increment' ? songIndex + 1 : songIndex - 1;
    let isCanSkip = isRepeatPlaylist
      ? true
      : type === 'increment'
      ? this.checkCanNextSong(song, playlists)
      : this.checkCanPrevSong(song, playlists);
    if (playlists.length > 1 && isCanSkip) {
      handlePlay(song, playlists, index);
    }
  }

  playNextSong(
    song: Song,
    playlists: SongPlaylist[],
    isRepeatPlaylist: boolean
  ) {
    const songIndex = this.getSongIndex(song, playlists);
    this.onPlay(song, playlists, songIndex, 'increment', isRepeatPlaylist);
  }

  playPrevSong(
    song: Song,
    playlists: SongPlaylist[],
    isRepeatPlaylist: boolean
  ) {
    const songIndex = this.getSongIndex(song, playlists);
    this.onPlay(song, playlists, songIndex, 'decrement', isRepeatPlaylist);
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
