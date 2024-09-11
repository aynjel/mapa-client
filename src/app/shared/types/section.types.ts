import { APIResponse } from './api/api-response.types';

export type Section = {
  slug: string;
  title: string;
  description: string;
  author: string;
  postsCount: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type SectionListResponse = APIResponse<Section[]>;

export type SectionResponse = APIResponse<Section>;

export type CreateSectionPayload = Pick<Section, 'title' | 'description'>;
