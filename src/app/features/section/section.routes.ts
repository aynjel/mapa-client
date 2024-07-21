import { Routes } from '@angular/router';
import { SectionComponent } from './section.component';
import { PostComponent } from '@features/post/post.component';

export const sectionRoutes: Routes = [
  {
    path: '',
    component: SectionComponent,
  },
  {
    path: ':id/post',
    component: PostComponent,
  },
];
