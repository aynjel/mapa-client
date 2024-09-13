import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = window.localStorage.getItem('user');

  if (!userData) {
    router.navigate(['/auth/signin']);
    return false;
  }

  return true;
};
