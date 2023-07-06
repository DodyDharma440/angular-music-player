import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Song } from 'src/app/models/song.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  routerSub!: Subscription;
  albumSub!: Subscription;

  album: Album | null = null;
  songs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getAlbum(id);
    });
  }

  ngOnDestroy(): void {
    this.albumSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  getAlbum(id: string) {
    this.albumSub = this.spotifyService.getAlbum(id).subscribe((data) => {
      this.album = data;
      this.songs = data.tracks?.items || [];
    });
  }

  getTotal() {
    const total = this.album?.tracks?.total || 0;
    return `${total} Song${total > 1 ? 's' : ''}`;
  }
}
