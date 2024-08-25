import { Routes } from '@angular/router';
import { sectionDetailsResolver } from './resolver/section-details.resolver';
import { SectionDetailsComponent } from './section-details/section-details.component';

export const sectionsRoutes: Routes = [
  {
    path: ':sectionSlug',
    component: SectionDetailsComponent,
    resolve: {
      section: sectionDetailsResolver,
    },
  },
];
