import { createAction, props } from '@ngrx/store';
import {
  LoginPayload,
  LoginResponse,
} from '../../shared/types/api/login.types';

export const login = createAction('[Login] User Login', props<LoginPayload>());

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<LoginResponse>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<LoginResponse>()
);
