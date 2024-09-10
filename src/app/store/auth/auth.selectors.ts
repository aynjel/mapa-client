import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const selectLogin = (state: AuthState) => state;

export const selectToken = createSelector(selectLogin, (state) => state.token);

export const selectError = createSelector(selectLogin, (state) => state.error);

export const selectIsLoading = createSelector(
  selectLogin,
  (state) => state.isLoading
);
