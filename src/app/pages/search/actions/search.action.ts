import { createAction, props } from '@ngrx/store';
import { SpotifyCategory } from 'src/app/models/base.model';
import { SearchResult, SearchStateData } from 'src/app/models/search.model';

export enum SearchActionType {
  UPDATE_SEARCH_RESULT = 'UPDATE_SEARCH_RESULT',
  RESET_SEARCH_RESULT = 'RESET_SEARCH_RESULT',
}

export const UpdateSearchAction = createAction(
  SearchActionType.UPDATE_SEARCH_RESULT,
  props<{
    payload: {
      key: `${SpotifyCategory}s`;
      data: SearchStateData;
    };
  }>()
);

export const ResetSearchAction = createAction(
  SearchActionType.RESET_SEARCH_RESULT,
  props
);
