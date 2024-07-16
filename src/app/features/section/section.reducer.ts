import { createReducer } from '@ngrx/store';

export interface SectionInitialStateTypes {
  sections: any[];
  isLoading: boolean;
  message: string;
}

const initialState = {
  sections: [],
  isLoading: false,
  message: '',
};

export const sectionReducer = createReducer(initialState);
