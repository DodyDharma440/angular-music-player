import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionType {
  GET_USER_DATA = 'GET_USER_DATA',
  CLEAR_STATE = 'CLEAR_STATE',
}

export const GetUserDataAction = createAction(
  UserActionType.GET_USER_DATA,
  props<{ payload: User | null }>()
);

export const ClearStateAction = createAction(UserActionType.CLEAR_STATE);
