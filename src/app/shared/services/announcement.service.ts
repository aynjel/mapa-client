import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  Announcement,
  AnnouncementListResponse,
  AnnouncementResponse,
  CreateAnnouncementPayload,
} from '../types/announcement.types';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  createAnnouncement(
    data: FormData,
    sectionSlug: string
  ): Observable<AnnouncementResponse> {
    return this.http.post<AnnouncementResponse>(
      `${environment.base_url}/api/posts/create/${sectionSlug}`,
      data
    );
  }

  getAnnouncements(
    page?: number,
    limit?: number
  ): Observable<AnnouncementListResponse> {
    return this.http.get<AnnouncementListResponse>(
      `${environment.base_url}/api/posts?page=${page}&limit=${limit}`
    );
  }

  getAnnouncement(announcementSlug: string): Observable<AnnouncementResponse> {
    return this.http.get<AnnouncementResponse>(
      `${environment.base_url}/api/posts/details/${announcementSlug}`
    );
  }

  getAnnouncementsBySectionId(
    section: string,
    page?: number,
    limit?: number
  ): Observable<AnnouncementListResponse> {
    return this.http.get<AnnouncementListResponse>(
      `${environment.base_url}/api/posts/${section}?page=${page}&limit=${limit}`
    );
  }

  deleteAnnouncement(a: Announcement): Observable<AnnouncementResponse> {
    return this.http.delete<AnnouncementResponse>(
      `${environment.base_url}/api/posts/${a.slug}`
    );
  }

  updateAnnouncement(
    a: Announcement,
    aPayload: FormData
  ): Observable<AnnouncementResponse> {
    return this.http.put<AnnouncementResponse>(
      `${environment.base_url}/api/posts/${a.slug}`,
      aPayload
    );
  }
}
