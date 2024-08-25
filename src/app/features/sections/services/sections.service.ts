import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  CreateSectionPayload,
  CreateSectionResponse,
  SectionListResponse,
  SectionDetailsResponse,
  UpdateSectionPayload,
  UpdateSectionResponse,
  DeleteSectionResponse,
} from '../types/section.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private http = inject(HttpClient);

  private readonly API_URL = environment.apiUrl;

  createSection(
    sectionPayload: CreateSectionPayload
  ): Observable<CreateSectionResponse> {
    return this.http.post<CreateSectionResponse>(
      `${this.API_URL}/sections`,
      sectionPayload
    );
  }

  getSections(): Observable<SectionListResponse> {
    return this.http.get<SectionListResponse>(`${this.API_URL}/sections`);
  }

  getSection(id: string): Observable<SectionDetailsResponse> {
    return this.http.get<SectionDetailsResponse>(
      `${this.API_URL}/sections/${id}`
    );
  }

  updateSection(
    id: string,
    sectionPayload: UpdateSectionPayload
  ): Observable<UpdateSectionResponse> {
    return this.http.put<UpdateSectionResponse>(
      `${this.API_URL}/sections/${id}`,
      sectionPayload
    );
  }

  deleteSection(id: string): Observable<DeleteSectionResponse> {
    return this.http.delete<DeleteSectionResponse>(
      `${this.API_URL}/sections/${id}`
    );
  }
}
