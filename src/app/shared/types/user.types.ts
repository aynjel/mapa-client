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

export type CurrentUserResponse = APIResponse<Omit<User, 'password'>>;

export type LogoutResponse = APIResponse<string>;
