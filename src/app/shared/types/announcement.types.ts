import { APIResponse } from './api/api-response.types';
import { Section } from './section.types';

export type Announcement = {
  slug: string;
  title: string;
  description: string;
  content: any;
  section: Section;
  author: string;
  commentsCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateAnnouncementPayload = Pick<
  Announcement,
  'title' | 'description' | 'content'
>;

export type AnnouncementListResponse = APIResponse<Announcement[]>;

export type AnnouncementResponse = APIResponse<Announcement>;
