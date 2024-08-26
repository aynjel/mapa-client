import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
// import { SectionStore } from '../sections.store';
import { Section } from '../types/section.types';
import { SectionsService } from '../services/sections.service';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

export const sectionDetailsResolver: ResolveFn<Section | null> = (
  route,
  state
) => {
  const sectionService = inject(SectionsService);
  const router = inject(Router);
  const titleService = inject(Title);

  const sectionSlug = route.paramMap.get('sectionSlug');
  if (!sectionSlug) {
    router.navigate(['/dashboard']);
    return null;
  }

  return sectionService.getSection(sectionSlug).pipe(
    map((section) => {
      titleService.setTitle(section.data.title);

      return section.data;
    })
  );
};
