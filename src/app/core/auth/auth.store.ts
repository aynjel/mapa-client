import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserTypes } from '@shared/types/User.types';
import { computed, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginPayloadTypes } from './types/LoginPayload.types';
import { RegisterPayloadTypes } from './types/RegisterPayload.types';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterResponseTypes } from './types/RegisterResponse.types';
import { LoginResponseTypes } from './types/LoginResponse.types';
import { CookieService } from 'ngx-cookie-service';

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
  withMethods(
    (
      store,
      authService = inject(AuthService),
      cookieService = inject(CookieService)
    ) => ({
      setCurrentUser: () => {
        authService.getCurrentUser().subscribe({
          next: (user: UserTypes) => {
            patchState(store, {
              isLoggedIn: true,
              user: user,
            });
          },
          error: (error: HttpErrorResponse) => {
            patchState(store, {
              isLoggedIn: false,
              user: null,
              message:
                error.message ||
                'User is not authorized' ||
                error.error.message,
            });
          },
        });
      },
      logout: () => {
        // cookieService.delete('token', '/');
        localStorage.removeItem('token');
        patchState(store, {
          isLoading: false,
          isSubmitted: false,
          isLoggedIn: false,
          user: null,
          message: 'User is logged out',
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
        patchState(store, { isLoading: true, isSubmitted: false, message: '' });

        authService.register(payload).subscribe({
          next: (response: RegisterResponseTypes) => {
            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              message: response.message,
            });
          },
          error: (error: HttpErrorResponse) => {
            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              user: null,
              message:
                error.message ||
                'User is not authorized' ||
                error.error.message,
            });
          },
        });
      },
      login: (payload: LoginPayloadTypes) => {
        patchState(store, { isLoading: true, isSubmitted: false, message: '' });

        authService.login(payload).subscribe({
          next: (response: LoginResponseTypes) => {
            // cookieService.set('token', response.token, 1, '/', '', true, 'Lax');
            localStorage.setItem('token', response.token);
            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              isLoggedIn: true,
              message: response.message,
            });
          },
          error: (error: HttpErrorResponse) => {
            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              isLoggedIn: false,
              message:
                error.message ||
                'User is not authorized' ||
                error.error.message,
            });
          },
        });
      },
    })
  )
);
