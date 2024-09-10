import { Action, ActionReducer } from '@ngrx/store';

export type AuthState = {
  token: string | null;
  error: string | null;
  isLoading: boolean;
};

export type AuthStore = {};
