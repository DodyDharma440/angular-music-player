import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SetSidebarPlaylistIdAction } from 'src/app/actions/playlist.action';
import { Playlist } from 'src/app/models/playlist.model';
import { Song } from 'src/app/models/song.model';
import { RootState } from 'src/app/models/state.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  routerSub!: Subscription;
  playlistSub!: Subscription;

  playlist: Playlist | null = null;
  playlistSongs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getPlaylist(id);
      this.store.dispatch(SetSidebarPlaylistIdAction({ payload: id }));
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.playlistSub.unsubscribe();
    this.store.dispatch(SetSidebarPlaylistIdAction({ payload: '' }));
  }

  getPlaylist(id: string) {
    this.playlistSub = this.spotifyService.getPlaylist(id).subscribe((data) => {
      const response = data as Playlist;
      this.playlist = response;

      const playlistSongs =
        response.tracks?.items?.map((item) => item.track) || [];
      this.playlistSongs = playlistSongs;
    });
  }

  getTotal() {
    const total = this.playlist?.tracks?.total || 0;
    return `${total} Song${total > 1 ? 's' : ''}`;
  }
}
