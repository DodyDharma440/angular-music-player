import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { SongService } from 'src/app/services/song.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'home-top-songs',
  templateUrl: './top-songs.component.html',
})
export class TopSongsComponent implements OnInit, OnDestroy {
  songSubs!: Subscription;
  isLoading = true;
  songs: Song[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.getTopSongs();
  }

  ngOnDestroy(): void {
    this.songSubs?.unsubscribe();
  }

  getTopSongs() {
    this.songSubs = this.spotifyService
      .getUserTopSongs('&limit=5')
      .subscribe((data) => {
        this.songs = data.items;
        this.isLoading = false;
      });
  }

  getArtistNames(artists: Artist[]) {
    return `by ${
      artists.map((artist) => artist.name).join(', ') || 'Unknown Artist'
    }`;
  }

  onPlaySong(song: Song) {
    if (song.preview_url) {
      this.songService.playSong(song, [song]);
    }
  }
}
