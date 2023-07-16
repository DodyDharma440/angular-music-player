import { createSelector } from '@ngrx/store';
import { searchFeature } from './search.reducer';

export const selectSearchState = createSelector(
  searchFeature.selectSearchState,
  (data) => data
);
