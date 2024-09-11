import { APIResponse } from './api/api-response.types';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  subscription: string;
  avatarURL: string;
  role: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDataSource = Omit<User, 'password'>;

export type CurrentUserResponse = APIResponse<UserDataSource>;

export type LogoutResponse = APIResponse<string>;
