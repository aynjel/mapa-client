import { createAction, props } from '@ngrx/store';
import {
  LoginPayload,
  LoginResponse,
} from '../../../shared/types/api/login.types';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export const loginStart = createAction(LOGIN_START, props<LoginPayload>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<LoginResponse>());

export const loginFailure = createAction(LOGIN_FAILURE, props<LoginResponse>());
