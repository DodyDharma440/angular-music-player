import { Action, createReducer, on } from '@ngrx/store';
import { GlobalSearchState } from '../models/search.model';
import { UpdateGlobalSearch } from '../actions/global-search.action';

const initialState: GlobalSearchState = {
  value: '',
};

export const globalSearchReducer = (
  state: GlobalSearchState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    initialState,
    on(UpdateGlobalSearch, (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    })
  );
  return reducer(state, action);
};
