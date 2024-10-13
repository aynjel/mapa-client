import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { DefaultComponent } from './layout/default/default.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/announcement/details/details.component';
import { DetailsLayoutComponent } from './layout/details-layout/details-layout.component';
import { SectionComponent } from './pages/section/section.component';
import { sectionResolver } from './resolvers/section.resolver';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { LessonDetailsComponent } from './pages/lesson/lesson-details/lesson-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'mapa',
    component: SidebarLayoutComponent,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'mapa/details',
    children: [
      {
        path: 'sections/:sectionSlug',
        component: SectionComponent,
        resolve: {
          section: sectionResolver,
        },
        title: 'Section Details',
      },
      {
        path: 'announcements/:announcementSlug',
        component: DetailsComponent,
        title: 'Announcement Details',
      },
      {
        path: 'lessons/:lessonSlug',
        component: LessonDetailsComponent,
        title: 'Lesson Details',
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Not Found',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
