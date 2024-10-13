import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateLessonPayload,
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

  getLessonById(lessonSlug: string): Observable<LessonResponse> {
    return this.http.get<LessonResponse>(
      `${environment.base_url}/api/lessons/${lessonSlug}`
    );
  }

  getLessonsBySectionId(
    section: string,
    page?: number,
    limit?: number
  ): Observable<LessonListResponse> {
    return this.http.get<LessonListResponse>(
      `${environment.base_url}/api/lessons/sections/${section}?page=${page}&limit=${limit}`
    );
  }

  deleteLesson(l: Lesson): Observable<LessonResponse> {
    return this.http.delete<LessonResponse>(
      `${environment.base_url}/api/lessons/${l.slug}`
    );
  }

  updateLesson(l: Lesson, lPayload: FormData): Observable<LessonResponse> {
    return this.http.put<LessonResponse>(
      `${environment.base_url}/api/lessons/${l.slug}`,
      lPayload
    );
  }
}
