import { Injectable } from '@angular/core';
import {
  CreateSectionPayload,
  SectionListResponse,
  SectionResponse,
} from '../types/section.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private http: HttpClient) {}

  getSections(page?: number, limit?: number): Observable<SectionListResponse> {
    return this.http.get<SectionListResponse>(
      `${environment.base_url}/api/sections?page=${page}&limit=${limit}`
    );
  }

  getSection(slug: string): Observable<SectionResponse> {
    return this.http.get<SectionResponse>(
      `${environment.base_url}/api/sections/${slug}`
    );
  }

  createSection(payload: CreateSectionPayload): Observable<SectionResponse> {
    return this.http.post<SectionResponse>(
      `${environment.base_url}/api/sections`,
      payload
    );
  }
}
