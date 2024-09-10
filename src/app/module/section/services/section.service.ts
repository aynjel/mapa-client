import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Section } from '../types/section.types';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor() {}

  getAll(): Observable<Section[]> {
    return of([
      {
        id: '1',
        name: 'section 1',
        description: 'description 1',
      },
      {
        id: '2',
        name: 'section 2',
        description: 'description 2',
      },
    ]).pipe(delay(2000));
  }

  add(section: Section): Observable<Section> {
    return of(section).pipe(delay(2000));
  }
}
