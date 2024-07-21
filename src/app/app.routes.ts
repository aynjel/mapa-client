import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { userResolver } from './core/resolver/user.resolver';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    // resolve: [userResolver],
    loadChildren: () =>
      import('./features/section/section.routes').then((m) => m.sectionRoutes),
  },
];
