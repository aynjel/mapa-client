import { createReducer, on } from '@ngrx/store';
import { Section } from '../types/section.types';
import * as SectionActions from './section.actions';

export interface SectionState {
  sections: Section[];
  loading: boolean;
  error: string;
}
export const initialState: SectionState = {
  sections: [],
  loading: false,
  error: '',
};
export const sectionReducer = createReducer(
  initialState,

  on(SectionActions.loadSections, (state) => ({ ...state, loading: true })),

  on(SectionActions.loadSectionsSuccess, (state, { sections }) => ({
    ...state,
    sections,
    loading: false,
  })),

  on(SectionActions.loadSectionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(SectionActions.addSection, (state, { section }) => ({
    ...state,
    sections: [...state.sections, section],
  })),

  on(SectionActions.updateSection, (state, { section }) => ({
    ...state,
    sections: state.sections.map((s) => (s.id === section.id ? section : s)),
  })),

  on(SectionActions.deleteSection, (state, { id }) => ({
    ...state,
    sections: state.sections.filter((s) => s.id !== id),
  }))
);
