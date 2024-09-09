import { User } from '../user.types';
import { APIResponse } from './api-response.types';

export type LoginResponse = APIResponse<
  Pick<User, 'id' | 'name' | 'email' | 'role' | 'token'>
>;

export type LoginPayload = Pick<User, 'email' | 'password'>;
