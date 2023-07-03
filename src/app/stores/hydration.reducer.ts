import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export const hydrationMetaReducer = <T>(
  reducer: ActionReducer<T>,
  key: string
): ActionReducer<T> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(key);
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem(key);
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem(key, JSON.stringify(nextState));
    return nextState;
  };
};
