import { createAction, props } from '@ngrx/store';
import { CreateSectionPayload } from '../interface/CreateSectionPayload.interface';

export const createSection = createAction(
  '[Section] Create Section',
  props<CreateSectionPayload>()
);
