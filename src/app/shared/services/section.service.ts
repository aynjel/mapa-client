import { Injectable } from '@angular/core';
import {
  CreateSectionPayload,
  Section,
  SectionListResponse,
  SectionResponse,
} from '../types/section.types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private http: HttpClient, private router: Router) {}

  getSections(page?: number, limit?: number): Observable<SectionListResponse> {
    return this.http
      .get<SectionListResponse>(
        `${environment.base_url}/api/sections?page=${page}&limit=${limit}`
      )
      .pipe(delay(1000));
  }

  getSection(slug: string): Observable<SectionResponse> {
    return this.http
      .get<SectionResponse>(`${environment.base_url}/api/sections/${slug}`)
      .pipe(delay(1000));
  }

  createSection(payload: CreateSectionPayload): Observable<SectionResponse> {
    return this.http
      .post<SectionResponse>(`${environment.base_url}/api/sections`, payload)
      .pipe(delay(1000));
  }
}
