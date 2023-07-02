import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionType {
  GET_USER_DATA = 'GET_USER_DATA',
}

export const GetUserDataAction = createAction(
  UserActionType.GET_USER_DATA,
  props<{ payload: User | null }>()
);
