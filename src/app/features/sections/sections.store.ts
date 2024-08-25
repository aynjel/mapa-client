import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CreateSectionPayload, Section } from './types/section.types';
import { computed, inject } from '@angular/core';
import { SectionsService } from './services/sections.service';
import { HttpErrorResponse } from '@angular/common/http';

type SectionState = {
  isLoading: boolean;
  isSubmitted: boolean;
  searchKeyword: string;
  sections: Section[];
  message: string;
};

const initialState: SectionState = {
  isLoading: false,
  isSubmitted: false,
  searchKeyword: '',
  sections: [],
  message: '',
};

export const SectionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    loadFilteredSections: computed(() => {
      return store
        .sections()
        .filter((section) => {
          return section.title
            .toLowerCase()
            .includes(store.searchKeyword().toLowerCase());
        })
        .reverse();
    }),
  })),
  withMethods((store, sectionService = inject(SectionsService)) => ({
    getSections() {
      patchState(store, { isLoading: true });
      sectionService.getSections().subscribe({
        next: (section) => {
          patchState(store, {
            isLoading: false,
            sections: section.data,
            message: section.message,
          });
        },
        error: (error: HttpErrorResponse) => {
          patchState(store, {
            isLoading: false,
            sections: [],
            message: error.error.message || error.message,
          });
        },
      });
    },
    setSearchKeyword(keyword: string) {
      patchState(store, { searchKeyword: keyword });
    },
    addSection(section: CreateSectionPayload) {
      patchState(store, { isLoading: true });
      sectionService.createSection(section).subscribe({
        next: (section) => {
          patchState(store, {
            isLoading: false,
            sections: [...store.sections(), section.data],
            message: section.message,
          });
        },
        error: (error: HttpErrorResponse) => {
          patchState(store, {
            isLoading: false,
            sections: [],
            message: error.error.message || error.message,
          });
        },
        complete: () => {
          patchState(store, { isSubmitted: true });
        },
      });
    },
  }))
);
