import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { State } from '../models/state.model';
import { UserActionType } from '../actions/user.action';

export function clearState(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function (state: State | undefined, action: Action): State {
    if (action.type === UserActionType.CLEAR_STATE) {
      state = undefined;
      localStorage.clear();
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = [clearState];
