import { ResolveFn } from '@angular/router';
import { UserTypes } from '../../shared/types/User.types';
import { inject } from '@angular/core';
import { AuthStore } from '../auth/auth.store';

export const userResolver: ResolveFn<UserTypes | null> = (route, state) => {
  const authStore = inject(AuthStore);

  console.log('UserResolver', authStore.user());

  return authStore.user();
};
