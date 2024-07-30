import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { AuthLayoutComponent } from '@core/layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from '@core/layouts/default-layout/default-layout.component';
import { NoSidebarLayoutComponent } from '@core/layouts/no-sidebar-layout/no-sidebar-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [guestGuard],
  },
  {
    path: 'profile',
    component: NoSidebarLayoutComponent,
    loadChildren: () =>
      import('./features/profile/profile.routes').then((m) => m.profileRoutes),
    canActivate: [authGuard],
    title: 'Profile',
  },
  {
    path: 'settings',
    component: NoSidebarLayoutComponent,
    loadChildren: () =>
      import('./features/settings/settings.routes').then(
        (m) => m.settingsRoutes
      ),
    canActivate: [authGuard],
    title: 'Settings',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/sections/sections.routes').then(
            (m) => m.sectionsRoutes
          ),
        title: 'Dashboard',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./core/users/users.routes').then((m) => m.usersRoutes),
        title: 'Users',
      },
    ],
  },
];
