import { ApiResponse } from '@shared/types/api-response.types';

export type Section = {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  postsCount: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type SectionListResponse = ApiResponse<Section[]>;

export type CreateSectionPayload = Pick<Section, 'title' | 'description'>;

export type CreateSectionResponse = ApiResponse<Section>;

export type SectionDetailsResponse = ApiResponse<Section>;

export type UpdateSectionPayload = ApiResponse<
  Pick<Section, 'title' | 'description'>
>;

export type UpdateSectionResponse = ApiResponse<Section>;

export type DeleteSectionResponse = ApiResponse<Section>;
