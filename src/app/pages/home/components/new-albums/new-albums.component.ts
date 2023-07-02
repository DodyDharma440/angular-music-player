import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album, NewAlbumsResponse } from 'src/app/models/album.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'home-new-albums',
  templateUrl: './new-albums.component.html',
})
export class NewAlbumsComponent implements OnInit, OnDestroy {
  albumsSubs: Subscription | undefined = undefined;
  isLoading = true;
  albums: Album[] = [];
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  ngOnDestroy(): void {
    this.albumsSubs?.unsubscribe();
  }

  getAlbums() {
    this.albumsSubs = this.spotifyService
      .getNewAlbums('&limit=8')
      .subscribe((data) => {
        const response = data as NewAlbumsResponse;
        this.albums = response.albums.items;
        this.isLoading = false;
      });
  }
}
