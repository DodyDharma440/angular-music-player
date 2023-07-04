import { createAction, props } from '@ngrx/store';
import { Playlist } from '../models/playlist.model';

export enum PlaylistActionType {
  GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS',
  GET_FEATURED_PLAYLISTS = 'GET_FEATURED_PLAYLISTS',
  GET_CATEGORY_PLAYLISTS = 'GET_CATEGORY_PLAYLISTS',
  SET_SIDEBAR_ID = 'SET_SIDEBAR_ID',
}

export const GetUserPlaylistsAction = createAction(
  PlaylistActionType.GET_USER_PLAYLISTS,
  props<{ payload: Playlist[] }>()
);

export const GetFeaturedPlaylistsAction = createAction(
  PlaylistActionType.GET_FEATURED_PLAYLISTS,
  props<{ payload: Playlist[] }>()
);

export const GetCategoryPlaylistsAction = createAction(
  PlaylistActionType.GET_CATEGORY_PLAYLISTS,
  props<{ payload: { id: string; data: Playlist[] } }>()
);

export const SetSidebarPlaylistIdAction = createAction(
  PlaylistActionType.SET_SIDEBAR_ID,
  props<{ payload: string }>()
);
