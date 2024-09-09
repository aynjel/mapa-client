import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { loginStart, loginSuccess, loginFailure } from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((loginAction) => {
        return this.authService.login(loginAction).pipe(
          map((loginResponse) => loginSuccess(loginResponse)),
          catchError((error) => of(loginFailure(error)))
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
