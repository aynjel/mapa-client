import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {
  SectionInterface,
  SectionListInterface,
} from './interface/Section.interface';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private http: HttpClient = inject(HttpClient);

  public getAll(): Observable<SectionInterface[]> {
    return this.http
      .get<SectionListInterface>(`${environment.apiUrl}/sections`)
      .pipe(map((response) => response.sections));
  }
}
