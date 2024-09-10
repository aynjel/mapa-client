import { createAction, props } from '@ngrx/store';
import { Section } from '../types/section.types';

export const loadSections = createAction('[Section] Load Sections');
export const loadSectionsSuccess = createAction(
  '[Section] Load Sections Success',
  props<{ sections: Section[] }>()
);
export const loadSectionsFailure = createAction(
  '[Section] Load Sections Failure',
  props<{ error: string }>()
);
export const addSection = createAction(
  '[Section] Add Section',
  props<{ section: Section }>()
);
export const updateSection = createAction(
  '[Section] Update Section',
  props<{ section: Section }>()
);
export const deleteSection = createAction(
  '[Section] Delete Section',
  props<{ id: string }>()
);
