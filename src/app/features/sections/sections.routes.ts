import { Routes } from '@angular/router';
import { SectionsComponent } from './sections.component';
import { SectionDetailsComponent } from './section-details/section-details.component';
import { sectionDetailsResolver } from './resolver/section-details.resolver';

export const sectionsRoutes: Routes = [
  {
    path: '',
    component: SectionsComponent,
  },
  {
    path: ':sectionID',
    component: SectionDetailsComponent,
    resolve: {
      sectionData: sectionDetailsResolver,
    },
  },
];
