import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
