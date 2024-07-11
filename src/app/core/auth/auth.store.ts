import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserTypes } from '../../shared/types/User.types';
import { computed, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginPayloadTypes } from './types/LoginPayload.types';
import { RegisterPayloadTypes } from './types/RegisterPayload.types';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterResponseTypes } from './types/RegisterResponse.types';
import { LoginResponseTypes } from './types/LoginResponse.types';

type UserStateTypes = {
  isLoading: boolean;
  isSubmitted: boolean;
  isLoggedIn: boolean;
  user: UserTypes | null;
  message: string;
};

const initialState: UserStateTypes = {
  isLoading: false,
  isSubmitted: false,
  isLoggedIn: false,
  user: null,
  message: '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({})),
  withMethods((store, authService = inject(AuthService)) => ({
    setCurrentUser: () => {
      authService.getCurrentUser().subscribe({
        next: (user: UserTypes) => {
          patchState(store, {
            isLoggedIn: true,
            user,
          });
        },
        error: (error: HttpErrorResponse) => {
          patchState(store, {
            isLoggedIn: false,
            user: null,
            message: error.error.message,
          });
        },
      });
    },
    reset: () => {
      patchState(store, {
        isLoading: false,
        isSubmitted: false,
        isLoggedIn: false,
        user: null,
        message: '',
      });
    },
    register: (payload: RegisterPayloadTypes) => {
      patchState(store, { isLoading: true, isSubmitted: false });

      authService.register(payload).subscribe({
        next: (response: RegisterResponseTypes) => {
          patchState(store, {
            isLoading: false,
            isSubmitted: true,
            user: response.user,
            message: response.message,
          });
        },
        error: (error: HttpErrorResponse) => {
          patchState(store, {
            isLoading: false,
            isSubmitted: true,
            user: null,
            message: error.error.message,
          });
        },
      });
    },
    login: (payload: LoginPayloadTypes) => {
      patchState(store, { isLoading: true, isSubmitted: false });

      authService.login(payload).subscribe({
        next: (response: LoginResponseTypes) => {
          window.localStorage.setItem('token', response.token);

          patchState(store, {
            isLoading: false,
            isSubmitted: true,
            isLoggedIn: true,
            user: null,
            message: response.message,
          });
        },
        error: (error: HttpErrorResponse) => {
          patchState(store, {
            isLoading: false,
            isSubmitted: true,
            isLoggedIn: false,
            message: error.error.message,
          });
        },
      });
    },
  }))
);
