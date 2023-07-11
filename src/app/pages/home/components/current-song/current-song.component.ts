import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Song, SongPlayer } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
import { SongService } from 'src/app/services/song.service';
import { msToMinutes } from 'src/app/utils/time';

@Component({
  selector: 'home-current-song',
  templateUrl: './current-song.component.html',
})
export class CurrentSongComponent implements OnInit, OnDestroy {
  @ViewChild('sliderProgress') sliderProgress!: ElementRef<HTMLDivElement>;

  songStateSubs!: Subscription;
  songPlayerSubs!: Subscription;
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

  ngAfterViewInit() {
    this.songPlayerSubs = this.store
      .select((store) => store.song.player)
      .subscribe((player) => {
        const width = `${(Number(player.currentTime / 1000) / 30) * 100}%`;
        this.sliderProgress.nativeElement.style.width = width;
      });
  }

  ngOnDestroy() {
    this.songStateSubs.unsubscribe();
    this.songPlayerSubs.unsubscribe();
  }

  getNames() {
    if (this.song) {
      return this.songService.getArtistNames(this.song);
    }
    return '-';
  }

  onTogglePlay() {
    this.songService.updateSongPlayer(({ player }) => ({
      isPlaying: !player.isPlaying,
    }));
  }

  getDuration() {
    return msToMinutes(30 * 1000);
  }

  getCurrentTime() {
    return msToMinutes(this.songPlayer.currentTime);
  }
}
