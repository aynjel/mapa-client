import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginSuccess, loginFailure } from './auth.actions';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login] User Login'),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((res) => loginSuccess(res)),
          catchError((error) => of(loginFailure(error)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
