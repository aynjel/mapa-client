import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginPayload, RegisterPayload } from '@core/types/auth.types';
import { User } from '@core/types/user.types';
import { switchMap } from 'rxjs';

type UserStateType = Omit<User, 'id' | 'password' | 'token'>;

type UserState = {
  isLoading: boolean;
  isSubmitted: boolean;
  isLoggedIn: boolean;
  user: UserStateType | null;
  message: string;
};

const initialState: UserState = {
  isLoading: false,
  isSubmitted: false,
  isLoggedIn: false,
  user: null,
  message: '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      cookieService = inject(CookieService)
    ) => ({
      logout: () => {
        patchState(store, {
          isLoading: true,
        });

        authService.logout().subscribe({
          next: (response) => {
            patchState(store, {
              isLoading: false,
              isSubmitted: false,
              isLoggedIn: false,
              user: null,
              message: response.message || 'User logged out.',
            });
          },
          error: (error: HttpErrorResponse) => {
            console.log('error', error);

            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              isLoggedIn: false,
              user: null,
              message: error.error.message || error.message,
            });
          },
          complete: () => {
            cookieService.delete('token', '/');
          },
        });
      },
      register: (payload: RegisterPayload) => {
        patchState(store, {
          isLoading: true,
          isSubmitted: false,
          user: null,
          message: '',
        });

        authService.register(payload).subscribe({
          next: (response) => {
            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              user: response.data,
              message: response.message || 'User is registered',
            });
          },
          error: (error: HttpErrorResponse) => {
            patchState(store, {
              isLoading: false,
              isSubmitted: true,
              user: null,
              message: error.error.message || error.message,
            });
          },
        });
      },
      login: (payload: LoginPayload) => {
        patchState(store, { isLoading: true, isSubmitted: false, message: '' });

        authService
          .login(payload)
          .pipe(
            switchMap((res) => {
              cookieService.set('token', res.data.token, { path: '/' });
              return authService.getCurrentUser();
            })
          )
          .subscribe({
            next: (response) => {
              patchState(store, {
                isLoading: false,
                isSubmitted: true,
                isLoggedIn: true,
                user: response.data,
                message: response.message || 'User is logged in',
              });
            },
            error: (error: HttpErrorResponse) => {
              patchState(store, {
                isLoading: false,
                isSubmitted: true,
                isLoggedIn: false,
                user: null,
                message: error.error.message || error.message,
              });
            },
          });
      },
      setCurrentUser: () => {
        if (cookieService.check('token')) {
          authService.getCurrentUser().subscribe({
            next: (response) => {
              patchState(store, {
                isLoading: false,
                isSubmitted: true,
                isLoggedIn: true,
                user: response.data,
                message: '',
              });
            },
            error: (error: HttpErrorResponse) => {
              patchState(store, {
                isLoading: false,
                isSubmitted: true,
                isLoggedIn: false,
                user: null,
                message: error.error.message || error.message,
              });
            },
          });
        }
      },
      resetState: () => {
        patchState(store, initialState);
      },
    })
  )
);
