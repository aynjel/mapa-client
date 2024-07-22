import { createAction, props } from '@ngrx/store';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ text: string; completed: false }>()
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ id: string; changes: { text: string; completed: false } }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: any[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);
