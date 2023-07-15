import { createAction, props } from '@ngrx/store';

export enum GlobalSearchActionType {
  GLOBAL_SEARCH_VALUE = 'GLOBAL_SEARCH_VALUE',
}

export const UpdateGlobalSearch = createAction(
  GlobalSearchActionType.GLOBAL_SEARCH_VALUE,
  props<{ payload: string }>()
);
