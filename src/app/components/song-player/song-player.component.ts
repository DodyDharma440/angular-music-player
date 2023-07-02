import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Song, SongState } from 'src/app/models/song.model';
import { State } from 'src/app/models/state.model';
import { SongService } from 'src/app/services/song.service';
import { msToMinutes } from 'src/app/utils/time';

@Component({
  selector: 'song-player',
  templateUrl: './song-player.component.html',
})
export class SongPlayerComponent implements OnInit {
  @ViewChild('musicPlayer') audioRef: ElementRef<HTMLAudioElement> | null =
    null;
  @ViewChild('rangeInput') rangeInput: ElementRef<HTMLInputElement> | null =
    null;
  @ViewChild('volumeInput') volumeInput: ElementRef<HTMLInputElement> | null =
    null;

  songState$: Observable<SongState['playedSong']> = this.store.select(
    (store) => store.songs.playedSong
  );

  song: Song | null = null;
  playlists: Song[] = [];
  currentTime = 0;
  volume = 100;
  isPlaying = true;
  isMuted = false;

  constructor(private store: Store<State>, private songService: SongService) {}

  ngOnInit() {
    this.songState$.subscribe((songState) => {
      this.playlists = songState.playlists;
      this.song = songState.song;

      if (
        !songState.song?.preview_url &&
        this.songService.checkCanNextSong(songState.song!, songState.playlists)
      ) {
        this.onPlayNext();
      }
    });
  }

  ngAfterViewInit() {
    const audio = this.audioRef?.nativeElement;

    audio?.addEventListener('ended', () => this.onPlayNext());
    audio?.addEventListener('pause', () => (this.isPlaying = false));
    audio?.addEventListener('play', () => (this.isPlaying = true));
    audio?.addEventListener('timeupdate', (e) => {
      const value = Number(
        (e.target as HTMLAudioElement).currentTime.toString().split('.')[0]
      );
      this.currentTime = value * 1000;
      this.rangeInput!.nativeElement.value = (
        e.target as HTMLAudioElement
      ).currentTime.toString();
    });
    audio?.addEventListener('volume', (e) => {
      const volume = (e.target as HTMLAudioElement).volume;
      this.volume = volume;
      this.volumeInput!.nativeElement.value = volume.toString();
    });
  }

  onChangeRange(rangeInput: HTMLInputElement) {
    this.audioRef!.nativeElement.currentTime = Number(rangeInput.value);
  }

  onChangeVolume(volumeInput: HTMLInputElement) {
    this.audioRef!.nativeElement.volume = Number(volumeInput.value);
  }

  onTogglePlay() {
    if (!this.isPlaying) {
      this.audioRef?.nativeElement.play();
    } else {
      this.audioRef?.nativeElement.pause();
    }
    this.isPlaying = Boolean(!this.isPlaying);
  }

  onPlayNext() {
    if (this.song) this.songService.playNextSong(this.song, this.playlists);
  }

  onPlayPrev() {
    if (this.song) this.songService.playPrevSong(this.song, this.playlists);
  }

  onToggleMute() {
    this.isMuted = !this.isMuted;
    this.audioRef!.nativeElement.muted = this.isMuted;
  }

  getNames() {
    if (this.song) {
      return this.songService.getArtistNames(this.song);
    }
    return '-';
  }

  getDuration() {
    return msToMinutes(30 * 1000);
  }

  getCurrentTime() {
    return msToMinutes(this.currentTime);
  }

  getDurationPercentage() {
    return Math.round((100 * this.currentTime) / 30);
  }
}
