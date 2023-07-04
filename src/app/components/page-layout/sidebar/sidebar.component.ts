import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GetUserPlaylistsAction } from 'src/app/actions/playlist.action';
import { menuItems } from 'src/app/constants/page-layout.constant';
import { Playlist, UserPlaylistResponse } from 'src/app/models/playlist.model';
import { RootState } from 'src/app/models/state.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { mergeRemoveDuplicates } from 'src/app/utils/data';

@Component({
  selector: 'nav[sidebar]',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() canRender: boolean = true;

  page = 1;
  perPage = 5;

  menus = menuItems;

  playlistSubs!: Subscription;
  playlists: Playlist[] = [];
  isMore = false;

  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private store: Store<RootState>
  ) {}

  ngOnInit() {
    this.store
      .select((store) => store.playlists.user)
      .subscribe((data) => {
        this.playlists = data;
      });

    this.getUserPlaylists();
  }

  ngOnDestroy() {
    this.playlistSubs?.unsubscribe();
  }

  isMenuActive(path: string): boolean {
    return this.router.url.split('?')[0] === path;
  }

  getUserPlaylists() {
    const params = new URLSearchParams();
    const offset = (this.page - 1) * this.perPage;
    params.append('offset', offset.toString());
    params.append('limit', this.perPage.toString());

    this.playlistSubs = this.spotifyService
      .getUserPlaylists(params.toString())
      .subscribe((data) => {
        const response = data as UserPlaylistResponse;
        const playlists = mergeRemoveDuplicates(
          this.playlists,
          response.items,
          (data, curr) => data.id === curr.id
        );
        this.isMore = Boolean(response.next);
        this.store.dispatch(GetUserPlaylistsAction({ payload: playlists }));
      });
  }
}
