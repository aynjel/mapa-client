import { APIResponse } from './api/api-response.types';
import { Section } from './section.types';

export type Lesson = {
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

export type CreateLessonPayload = Pick<
  Lesson,
  'title' | 'description' | 'content'
>;

export type LessonListResponse = APIResponse<Lesson[]>;

export type LessonResponse = APIResponse<Lesson>;
