import { User, UserDataSource } from '../user.types';
import { APIResponse } from './api-response.types';

export type LoginResponse = APIResponse<UserDataSource>;

export type LoginPayload = Pick<User, 'email' | 'password'>;
