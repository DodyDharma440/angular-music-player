import { Action, createReducer, on } from '@ngrx/store';
import { PlaylistState } from '../models/playlist.model';
import {
  GetCategoryPlaylistsAction,
  GetFeaturedPlaylistsAction,
  GetUserPlaylistsAction,
  SetSidebarPlaylistIdAction,
} from '../actions/playlist.action';

const initialState: PlaylistState = {
  user: [],
  featured: [],
  category: {},
  sidebarId: '',
};

export const playlistReducer = (
  state: PlaylistState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    state,
    on(GetUserPlaylistsAction, (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    }),
    on(GetFeaturedPlaylistsAction, (state, action) => {
      return {
        ...state,
        featured: action.payload,
      };
    }),
    on(GetCategoryPlaylistsAction, (state, action) => {
      return {
        ...state,
        category: {
          ...state.category,
          [action.payload.id]: action.payload.data,
        },
      };
    }),
    on(SetSidebarPlaylistIdAction, (state, action) => {
      return {
        ...state,
        sidebarId: action.payload,
      };
    })
  );

  return reducer(state, action);
};
