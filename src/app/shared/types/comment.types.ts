import { APIResponse } from './api/api-response.types';
import { Announcement } from './announcement.types';
import { User } from './user.types';

export type Comment = {
  _id: number;
  content: string;
  author: any;
  post: Announcement;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CommentListResponse = APIResponse<Comment[]>;

export type CommentResponse = APIResponse<Comment>;

export type CreateCommentPayload = {
  content: string;
  post: string;
};
