import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  AnnouncementResponse,
  CreateAnnouncementPayload,
} from '../types/announcement.types';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  createAnnouncement(
    data: CreateAnnouncementPayload
  ): Observable<AnnouncementResponse> {
    return this.http.post<AnnouncementResponse>(
      `${environment.base_url}/api/posts`,
      data
    );
  }
}
