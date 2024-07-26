import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { Section } from '../types/section.types';
import { Observable } from 'rxjs';
import { CreateSectionResponse } from '../types/create-section-response.types';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private http = inject(HttpClient);

  private readonly API_URL = environment.apiUrl;

  createSection(
    sectionPayload: Omit<Section, 'id'>
  ): Observable<CreateSectionResponse> {
    return this.http.post<CreateSectionResponse>(
      `${this.API_URL}/sections`,
      sectionPayload
    );
  }
}
