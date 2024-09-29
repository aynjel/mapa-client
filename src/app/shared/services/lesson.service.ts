import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Lesson,
  LessonListResponse,
  LessonResponse,
} from '../types/lesson.types';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) {}

  createLesson(data: FormData, section: string): Observable<LessonResponse> {
    return this.http.post<LessonResponse>(
      `${environment.base_url}/api/lessons/create/${section}`,
      data
    );
  }

  getLessons(page?: number, limit?: number): Observable<LessonListResponse> {
    return this.http.get<LessonListResponse>(
      `${environment.base_url}/api/lessons?page=${page}&limit=${limit}`
    );
  }

  getLessonsBySection(
    section: string,
    page?: number,
    limit?: number
  ): Observable<LessonListResponse> {
    return this.http.get<LessonListResponse>(
      `${environment.base_url}/api/lessons/${section}?page=${page}&limit=${limit}`
    );
  }

  deleteLesson(l: Lesson): Observable<LessonResponse> {
    return this.http.delete<LessonResponse>(
      `${environment.base_url}/api/lessons/${l.section.slug}/${l.slug}`
    );
  }
}
