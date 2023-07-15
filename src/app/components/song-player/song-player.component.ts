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
import { Subscription } from 'rxjs';
import { Song, SongPlayer, SongPlaylist } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
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

  songPlayerSubs!: Subscription;
  songStateSubs!: Subscription;
  songPlaylistSubs!: Subscription;

  song: Song | null = null;
  playlists: SongPlaylist[] = [];

  songPlayer!: SongPlayer;

  constructor(
    private store: Store<RootState>,
    private songService: SongService
  ) {}

  ngOnInit() {
    this.songPlayerSubs = this.store
      .select((store) => store.song.player)
      .subscribe((player) => {
        this.songPlayer = player;
      });

    this.songStateSubs = this.store
      .select((store) => store.song.song)
      .subscribe((song) => {
        this.song = song;
      });

    this.songPlayerSubs = this.store
      .select((store) => store.song.playlists)
      .subscribe((playlist) => {
        this.playlists = playlist;
      });
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
    this.songStateSubs.unsubscribe();
    this.songPlayerSubs.unsubscribe();
    this.songPlaylistSubs.unsubscribe();
  }

  ngAfterViewInit() {
    this.songService.updateSongPlayer({ isPlaying: false });

    const audio = this.audioRef?.nativeElement;
    audio?.addEventListener('ended', (e) => {
      if (
        this.songPlayer.repeatMode === 'song' ||
        (this.songPlayer.repeatMode === 'playlist' &&
          this.playlists.length <= 1)
      ) {
        (e.target as HTMLAudioElement).play();
      } else {
        this.onPlayNext();
      }
    });
    audio?.addEventListener('pause', () =>
      this.songService.updateSongPlayer({ isPlaying: false })
    );
    audio?.addEventListener('play', () => {
      this.songService.updateSongPlayer({ isPlaying: true });
    });
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

    this.audioRef!.nativeElement.muted = this.songPlayer.isMuted;
    this.onUpdateVolumeUi((this.songPlayer.volume / 100).toString());
    this.onUpdateProgressUi(this.songPlayer.currentTime.toString());
    this.audioRef!.nativeElement.currentTime =
      Number(this.songPlayer.currentTime) / 1000;
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
        this.songPlayer.repeatMode === 'playlist'
      );
  }

  onPlayPrev() {
    if (this.song)
      this.songService.playPrevSong(
        this.song,
        this.playlists,
        this.songPlayer.repeatMode === 'playlist'
      );
  }

  onToggleShuffle() {
    this.songService.updateSongPlayer((prev) => ({
      isShuffle: !prev.player.isShuffle,
    }));
    if (this.song) {
      this.songService.toggleShuffle(
        this.song,
        this.playlists,
        this.songPlayer.isShuffle
      );
    }
  }

  onToggleRepeat() {
    switch (this.songPlayer.repeatMode) {
      case 'none':
        this.songService.updateSongPlayer({ repeatMode: 'playlist' });
        break;

      case 'playlist':
        this.songService.updateSongPlayer({ repeatMode: 'song' });
        break;

      default:
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
    return msToMinutes(this.songPlayer.currentTime);
  }
}
