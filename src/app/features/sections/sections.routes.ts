import { Routes } from '@angular/router';
import { SectionsComponent } from './sections.component';
import { SectionDetailsComponent } from './section-details/section-details.component';
import { sectionsResolver } from './resolver/sections.resolver';
import { sectionDetailsResolver } from './resolver/section-details.resolver';

export const sectionsRoutes: Routes = [
  {
    path: '',
    component: SectionsComponent,
    resolve: {
      sectionsData: sectionsResolver,
    },
  },
  {
    path: ':sectionID',
    component: SectionDetailsComponent,
    title: 'Section Details',
    resolve: {
      sectionData: sectionDetailsResolver,
    },
  },
];
