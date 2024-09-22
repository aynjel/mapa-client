import { APIResponse } from './api/api-response.types';

export type Announcement = {
  slug: string;
  title: string;
  description: string;
  content: any;
  section: string;
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
