import { Injectable } from '@angular/core';
import { LessonService } from './lesson.service';
import { AnnouncementService } from './announcement.service';
import { SectionService } from './section.service';
import {
  CreateLessonPayload,
  Lesson,
  LessonListResponse,
  LessonResponse,
} from '../types/lesson.types';
import { Observable } from 'rxjs';
import {
  Announcement,
  AnnouncementListResponse,
  AnnouncementResponse,
} from '../types/announcement.types';
import {
  Section,
  SectionListResponse,
  SectionResponse,
} from '../types/section.types';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(
    private lessonService: LessonService,
    private announcementService: AnnouncementService,
    private sectionService: SectionService
  ) {}

  getLessons(): Observable<LessonListResponse> {
    return this.lessonService.getLessons();
  }

  getAnnouncements(): Observable<LessonListResponse> {
    return this.announcementService.getAnnouncements();
  }

  getSections(): Observable<SectionListResponse> {
    return this.sectionService.getSections();
  }

  getLessonById(lessonSlug: string): Observable<LessonResponse> {
    return this.lessonService.getLessonById(lessonSlug);
  }

  getLessonsBySectionId(sectionId: string): Observable<LessonListResponse> {
    return this.lessonService.getLessonsBySectionId(sectionId);
  }

  getAnnouncementsBySectionId(
    sectionId: string
  ): Observable<AnnouncementListResponse> {
    return this.announcementService.getAnnouncementsBySectionId(sectionId);
  }

  createAnnouncement(
    data: FormData,
    section: string
  ): Observable<AnnouncementResponse> {
    return this.announcementService.createAnnouncement(data, section);
  }

  createLesson(data: FormData, section: string): Observable<LessonResponse> {
    return this.lessonService.createLesson(data, section);
  }

  deleteAnnouncement(a: Announcement): Observable<AnnouncementResponse> {
    return this.announcementService.deleteAnnouncement(a);
  }

  deleteLesson(l: Lesson): Observable<LessonResponse> {
    return this.lessonService.deleteLesson(l);
  }

  deleteSection(s: Section): Observable<SectionResponse> {
    return this.sectionService.deleteSection(s);
  }

  updateLesson(l: Lesson, lPayload: FormData): Observable<LessonResponse> {
    return this.lessonService.updateLesson(l, lPayload);
  }
}
