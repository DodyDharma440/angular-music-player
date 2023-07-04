import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { RootState } from '../models/state.model';
import { UserActionType } from '../actions/user.action';

export function clearState(
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> {
  return function (state: RootState | undefined, action: Action): RootState {
    if (action.type === UserActionType.CLEAR_STATE) {
      state = undefined;
      localStorage.clear();
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<RootState>[] = [clearState];
