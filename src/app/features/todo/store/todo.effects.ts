import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadTodosSuccess, loadTodosFailure } from './todo.actions';
import { TodoService } from '../todo.service';

@Injectable()
export class TodoEffects {
  private actions$: Actions = inject(Actions);
  private todoService: TodoService = inject(TodoService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo] Load Todos'),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );
}
