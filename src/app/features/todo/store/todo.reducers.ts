import { createReducer, on } from '@ngrx/store';
import { addTodo } from './todo.actions';

export const initialState = [{ text: 'Learn NgRx' }];

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { text }) => [...state, { text }])
);
