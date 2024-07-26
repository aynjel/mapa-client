import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (!authStore.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  authStore.setCurrentUser();
  console.log(authStore.user());

  return true;
};
