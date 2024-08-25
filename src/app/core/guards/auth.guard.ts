import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { SectionStore } from '@features/sections/sections.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const sectionStore = inject(SectionStore);
  const router = inject(Router);

  if (!authStore.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  sectionStore.getSections();
  return true;
};
