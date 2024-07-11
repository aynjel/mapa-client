import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Auth Guard');

  const authStore = inject(AuthStore);

  if (!authStore.user()) {
    // router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
