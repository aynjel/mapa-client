import { User } from '@core/types/user.types';
import { ApiResponse } from '@shared/types/api-response.types';

export type RegisterPayload = Omit<
  User,
  'id' | 'token' | 'avatarURL' | 'subscription' | 'role'
>;

export type RegisterResponse = ApiResponse<Omit<User, 'token' | 'password'>>;

export type LoginPayload = Pick<User, 'email' | 'password'>;

export type LoginResponse = ApiResponse<Pick<User, 'token'>>;

export type LogoutResponse = ApiResponse<Pick<User, 'token'>>;

export type CurrentUserResponse = ApiResponse<Omit<User, 'id' | 'password'>>;
