import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist, PlaylistResponse } from 'src/app/models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'home-playlists',
  templateUrl: './playlists.component.html',
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlistSubs!: Subscription;
  playlists: Playlist[] = [];
  isLoading = true;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  ngOnDestroy(): void {
    this.playlistSubs.unsubscribe();
  }

  getPlaylists() {
    this.playlistSubs = this.spotifyService
      .getFeaturedPlaylists('&limit=5')
      .subscribe((data) => {
        const response = data as PlaylistResponse;
        this.playlists = response.playlists.items;
        this.isLoading = false;
      });
  }
}
