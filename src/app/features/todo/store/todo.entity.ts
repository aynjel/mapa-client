import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../interface/Todo.interface';
import { addTodo, updateTodo, deleteTodo } from './todo.actions';

export const todoAdapter = createEntityAdapter<Todo>();

export const initialTodoState = todoAdapter.getInitialState();

export const todoReducer = createReducer(
  initialTodoState,
  on(addTodo, (state, todo) => todoAdapter.addOne(todo, state)),
  on(updateTodo, (state, { id, changes }) =>
    todoAdapter.updateOne({ id, changes }, state)
  ),
  on(deleteTodo, (state, { id }) => todoAdapter.removeOne(id, state))
);
