import { ResolveFn } from '@angular/router';
import { UserTypes } from '../../shared/types/User.types';
import { inject } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
// import { CookieService } from 'ngx-cookie-service';

export const userResolver: ResolveFn<UserTypes | null> = (route, state) => {
  const authStore = inject(AuthStore);
  // const cookieService = inject(CookieService);

  // const token = cookieService.get('token');

  // if (authStore.isLoggedIn() && token) {
  //   console.log('User is already logged in');

  //   authStore.setCurrentUser();

  //   return authStore.user();
  // }

  return authStore.user();
};
