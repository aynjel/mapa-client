import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { AuthState } from './auth.state';

const initialAuthState: AuthState = {
  token: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({ ...state, isLoading: true })),
  on(loginSuccess, (state, { data }) => ({
    ...state,
    token: data.token,
    isLoading: false,
  })),
  on(loginFailure, (state, { message }) => ({
    ...state,
    error: message,
    isLoading: false,
  }))
);
