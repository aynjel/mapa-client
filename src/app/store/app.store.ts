import { Action, ActionReducer } from '@ngrx/store';
import { SectionEffects } from '../module/section/store/section.effects';
import {
  sectionReducer,
  SectionState,
} from '../module/section/store/section.reducers';

export interface AppState {
  section: SectionState;
}

export interface AppStore {
  section: ActionReducer<SectionState, Action>;
}

export const appStore: AppStore = {
  section: sectionReducer,
};

export const appEffects = [SectionEffects];
