import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { userResolver } from './core/resolver/user.resolver';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'section',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./features/todo/todo.routes').then((m) => m.todoRoutes),
    providers: [],
  },
  {
    path: 'section',
    loadChildren: () =>
      import('./features/section/section.routes').then((m) => m.sectionRoutes),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./core/layouts/user-layout/user-layout.component').then(
        (m) => m.UserLayoutComponent
      ),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        title: 'Profile',
        resolve: {
          user: userResolver,
        },
      },
      {
        path: 'section',
        loadComponent: () =>
          import('./features/section/section-list/section-list.component').then(
            (m) => m.SectionListComponent
          ),
        title: 'Section',
      },
    ],
    canActivate: [authGuard],
  },
];
