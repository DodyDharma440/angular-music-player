import { UserState } from '../models/user.model';
import { GetUserDataAction } from '../actions/user.action';
import { Action, createReducer, on } from '@ngrx/store';

const initialState: UserState = {
  userData: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    initialState,
    on(GetUserDataAction, (state, action) => {
      return {
        ...state,
        userData: action.payload,
      };
    })
  );
  return reducer(state, action);
};
