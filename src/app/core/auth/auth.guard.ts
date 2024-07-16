import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
