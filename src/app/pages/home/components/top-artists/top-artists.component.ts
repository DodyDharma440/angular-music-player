import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: '[home-top-artists]',
  templateUrl: './top-artists.component.html',
})
export class TopArtistsComponent implements OnInit, OnDestroy {
  songSubs!: Subscription;
  isLoading = true;
  artists: Artist[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  ngOnDestroy(): void {
    this.songSubs.unsubscribe();
  }

  getTopArtists() {
    this.songSubs = this.spotifyService
      .getUserTopArtists('&limit=5')
      .subscribe((data) => {
        this.artists = data.items;
        this.isLoading = false;
      });
  }
}
