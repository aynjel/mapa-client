import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isLoggedIn()) {
    console.log('User is logged in');
    return true;
  }

  router.navigate(['/auth/login']).then(() => {
    console.log('User is not logged in');
  });
  return false;
};
