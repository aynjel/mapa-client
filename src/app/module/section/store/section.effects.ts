import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { SectionService } from '../services/section.service';
import * as SectionActions from './section.actions';

@Injectable()
export class SectionEffects {
  loadSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.loadSections),
      mergeMap(() =>
        this.sectionService.getAll().pipe(
          map((sections) => SectionActions.loadSectionsSuccess({ sections })),
          catchError((error) =>
            of(SectionActions.loadSectionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.addSection),
      switchMap(({ section }) =>
        this.sectionService.add(section).pipe(
          map((section) => SectionActions.addSection({ section })),
          catchError((error) =>
            of(SectionActions.loadSectionsFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private sectionService: SectionService
  ) {}
}
