import { AppState } from '../../../store/app.store';
import { SectionState } from './section.reducers';

export const sectionSelector = (state: AppState) => state.section.sections;

export const sectionLoadingSelector = (state: AppState) =>
  state.section.loading;
