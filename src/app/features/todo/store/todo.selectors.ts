import { createSelector } from '@ngrx/store';
import { Todo } from '../interface/Todo.interface';

export const selectTodos = (state: Todo[]) => state;

export const selectCompletedTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => todo.completed)
);
