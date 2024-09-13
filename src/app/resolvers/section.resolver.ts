import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SectionService } from '../shared/services/section.service';
import { Section } from '../shared/types/section.types';
import { map } from 'rxjs';

export const sectionResolver: ResolveFn<Section> = (route, state) => {
  const sectionService = inject(SectionService);
  const sectionSlug = route.paramMap.get('sectionSlug');

  return sectionService
    .getSection(sectionSlug!)
    .pipe(map((section) => section.data));
};
