import { User } from '../user.types';
import { APIResponse } from './api-response.types';

export type RegisterResponse = APIResponse<Omit<User, 'password'>>;

export type RegisterPayload = Pick<
  User,
  'name' | 'email' | 'password' | 'role'
>;
