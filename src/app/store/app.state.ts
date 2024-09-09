import { AuthReducer } from '../pages/auth/state/auth.reducers';
import { AUTH_STATE_NAME } from '../pages/auth/state/auth.selectors';
import { AuthState } from '../pages/auth/state/auth.state';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export type AppState = {
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
};

export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,
};
