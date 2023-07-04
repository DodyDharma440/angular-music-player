import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RepeatMode, Song, SongState } from 'src/app/models/song.model';
import { State } from 'src/app/models/state.model';
import { SongService } from 'src/app/services/song.service';
import { msToMinutes } from 'src/app/utils/time';

@Component({
  selector: 'song-player',
  templateUrl: './song-player.component.html',
})
export class SongPlayerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isPlaying: boolean = false;

  @ViewChild('musicPlayer') audioRef: ElementRef<HTMLAudioElement> | null =
    null;

  @ViewChild('rangeInput') rangeInput: ElementRef<HTMLInputElement> | null =
    null;
  @ViewChild('sliderThumb') sliderThumb: ElementRef<HTMLDivElement> | null =
    null;
  @ViewChild('sliderProgress')
  sliderProgress: ElementRef<HTMLDivElement> | null = null;

  @ViewChild('volumeInput') volumeInput: ElementRef<HTMLInputElement> | null =
    null;
  @ViewChild('volumeThumb') volumeThumb: ElementRef<HTMLDivElement> | null =
    null;
  @ViewChild('volumeProgress')
  volumeProgress: ElementRef<HTMLDivElement> | null = null;

  songStateSubs: Subscription | null = null;
  songState$: Observable<SongState> = this.store.select((store) => store.song);

  song: Song | null = null;
  playlists: Song[] = [];

  isMuted = false;
  isShuffle = false;
  volume = 100;
  currentTime = 0;
  repeatMode: RepeatMode = 'none';

  constructor(private store: Store<State>, private songService: SongService) {}

  ngOnInit() {
    this.songStateSubs = this.songState$.subscribe(
      ({ playlists, song, player }) => {
        this.playlists = playlists;
        this.song = song;

        const {
          volume,
          isMuted,
          isPlaying,
          currentTime,
          isShuffle,
          repeatMode,
        } = player;

        this.volume = volume;
        this.isPlaying = isPlaying;
        this.isMuted = isMuted;
        this.currentTime = currentTime;
        this.isShuffle = isShuffle;
        this.repeatMode = repeatMode;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isPlayingChanges = changes['isPlaying'];
    if (isPlayingChanges) {
      if (typeof isPlayingChanges.previousValue === 'boolean') {
        if (isPlayingChanges.previousValue) {
          this.audioRef?.nativeElement.pause();
        } else {
          this.audioRef?.nativeElement.play();
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.songStateSubs?.unsubscribe();
  }

  ngAfterViewInit() {
    this.songService.updateSongPlayer({ isPlaying: false });

    const audio = this.audioRef?.nativeElement;
    audio?.addEventListener('ended', (e) => {
      if (this.repeatMode === 'song') {
        (e.target as HTMLAudioElement).play();
      } else {
        this.onPlayNext();
      }
    });
    audio?.addEventListener('pause', () =>
      this.songService.updateSongPlayer({ isPlaying: false })
    );
    audio?.addEventListener('play', () =>
      this.songService.updateSongPlayer({ isPlaying: true })
    );
    audio?.addEventListener('timeupdate', (e) => {
      const rangeValue = (e.target as HTMLAudioElement).currentTime.toString();
      const timeValue = Number(rangeValue.split('.')[0]);
      this.songService.updateSongPlayer({ currentTime: timeValue * 1000 });
      this.rangeInput!.nativeElement.value = rangeValue;
      this.onUpdateProgressUi(rangeValue);
    });
    audio?.addEventListener('volume', (e) => {
      const volume = (e.target as HTMLAudioElement).volume;
      this.volumeInput!.nativeElement.value = volume.toString();
      this.songService.updateSongPlayer({ volume: volume * 100 });
    });

    this.audioRef!.nativeElement.muted = this.isMuted;
    this.onUpdateVolumeUi((this.volume / 100).toString());
    this.onUpdateProgressUi(this.currentTime.toString());
    this.audioRef!.nativeElement.currentTime = Number(this.currentTime) / 1000;
  }

  onUpdateProgressUi(value: string) {
    const width = `${(Number(value) / 30) * 100}%`;
    this.sliderProgress!.nativeElement.style.width = width;
    this.sliderThumb!.nativeElement.style.left = width;
  }

  onUpdateVolumeUi(value: string) {
    const width = `${(Number(value) / 100) * 100 * 100}%`;
    this.volumeProgress!.nativeElement.style.width = width;
    this.audioRef!.nativeElement.volume = Number(value);
  }

  onChangeRange(rangeInput: HTMLInputElement) {
    this.audioRef!.nativeElement.currentTime = Number(rangeInput.value);
    this.onUpdateProgressUi(rangeInput.value);
    const timeValue = Number(rangeInput.value.split('.')[0]);
    this.songService.updateSongPlayer({ currentTime: timeValue * 1000 });
  }

  onChangeVolume(volumeInput: HTMLInputElement) {
    this.onUpdateVolumeUi(volumeInput.value);
    this.songService.updateSongPlayer({
      volume: Math.round(Number(volumeInput.value) * 100),
    });
  }

  onTogglePlay() {
    this.songService.updateSongPlayer(({ player }) => ({
      isPlaying: !player.isPlaying,
    }));
  }

  onPlayNext() {
    if (this.song)
      this.songService.playNextSong(
        this.song,
        this.playlists,
        this.isShuffle,
        this.repeatMode === 'playlist'
      );
  }

  onPlayPrev() {
    if (this.song)
      this.songService.playPrevSong(
        this.song,
        this.playlists,
        this.isShuffle,
        this.repeatMode === 'playlist'
      );
  }

  onToggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.songService.updateSongPlayer({ isShuffle: this.isShuffle });
  }

  onToggleRepeat() {
    switch (this.repeatMode) {
      case 'none':
        this.repeatMode = 'playlist';
        this.songService.updateSongPlayer({ repeatMode: 'playlist' });
        break;

      case 'playlist':
        this.repeatMode = 'song';
        this.songService.updateSongPlayer({ repeatMode: 'song' });
        break;

      default:
        this.repeatMode = 'none';
        this.songService.updateSongPlayer({ repeatMode: 'none' });
        break;
    }
  }

  onToggleMute() {
    this.songService.updateSongPlayer(({ player }) => {
      this.audioRef!.nativeElement.muted = !player.isMuted;
      return {
        isMuted: !player.isMuted,
      };
    });
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
}
