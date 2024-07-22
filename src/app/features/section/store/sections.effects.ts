// import { inject } from '@angular/core';
// import { catchError, exhaustMap, map, of, tap } from 'rxjs';
// import { Actions, createEffect, ofType } from '@ngrx/effects';

// import { SectionService } from '../section.service';
// import { sectionActions } from './section.actions';

// export const loadSections = createEffect(
//   (actions$ = inject(Actions), sectionService = inject(SectionService)) => {
//     return actions$.pipe(
//       ofType(sectionActions.loadSections),
//       exhaustMap(() => sectionService.getAll().pipe())
//     );
//   },
//   { functional: true }
// );
