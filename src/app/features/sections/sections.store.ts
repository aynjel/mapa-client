import { signalStore, withMethods, withState } from '@ngrx/signals';
import { Section } from './types/section.types';
import { inject } from '@angular/core';
import { SectionsService } from './services/sections.service';

type SectionState = {
  isLoading: boolean;
  isSubmitted: boolean;
  sections: Section[];
  section: Section | null;
  message: string;
};

const initialState: SectionState = {
  isLoading: false,
  isSubmitted: false,
  sections: [],
  section: null,
  message: '',
};

export const SectionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, sectionService = inject(SectionsService)) => ({
    addSection: (section: Section) => {},
  }))
);
