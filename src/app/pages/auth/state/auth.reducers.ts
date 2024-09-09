import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';

const _authReducer = createReducer(initialAuthState);

export function AuthReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
