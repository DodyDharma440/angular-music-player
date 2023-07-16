import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { SearchState } from 'src/app/models/search.model';
import {
  ResetSearchAction,
  UpdateSearchAction,
} from '../actions/search.action';

const initialState: SearchState = {
  albums: { page: 1, data: [] },
  tracks: { page: 1, data: [] },
  artists: { page: 1, data: [] },
  playlists: { page: 1, data: [] },
};

export const searchReducer = (
  state: SearchState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    initialState,
    on(UpdateSearchAction, (state, action) => {
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };
    }),
    on(ResetSearchAction, () => {
      return initialState;
    })
  );

  return reducer(state, action);
};

export const searchFeature = createFeature({
  name: 'search',
  reducer: searchReducer,
});
