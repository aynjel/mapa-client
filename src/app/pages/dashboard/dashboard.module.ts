import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { UserComponent } from '../user/user.component';
import { LessonComponent } from '../lesson/lesson.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
  },
  {
    path: 'announcements',
    component: AnnouncementComponent,
    title: 'Announcements',
  },
  {
    path: 'lessons',
    component: LessonComponent,
    title: 'Lesson',
  },
  {
    path: 'users',
    component: UserComponent,
    title: 'User',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModule {}
