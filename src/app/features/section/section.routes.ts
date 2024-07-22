import { Routes } from '@angular/router';
import { SectionListComponent } from './section-list/section-list.component';

export const sectionRoutes: Routes = [
  {
    path: '',
    component: SectionListComponent,
    title: 'Section',
  },
];
