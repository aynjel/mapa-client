import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Comment,
  CommentListResponse,
  CommentResponse,
} from '../types/comment.types';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(content: string, post: string): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${environment.base_url}/api/comments/create/${post}`,
      { content }
    );
  }

  getComments(post: string): Observable<CommentListResponse> {
    return this.http.get<CommentListResponse>(
      `${environment.base_url}/api/comments/index/${post}`
    );
  }

  deleteComment(comment: Comment): Observable<CommentResponse> {
    return this.http.delete<CommentResponse>(
      `${environment.base_url}/api/comments/${comment._id}`
    );
  }
}
