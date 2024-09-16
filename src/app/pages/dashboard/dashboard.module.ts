import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SectionComponent } from '../section/section.component';
import { sectionResolver } from '../../resolvers/section.resolver';
import { ProfileComponent } from '../profile/profile.component';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { UserComponent } from '../user/user.component';

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
    path: 'dashboard/:sectionSlug',
    component: SectionComponent,
    resolve: {
      section: sectionResolver,
    },
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
