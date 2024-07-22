import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './interface/Todo.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos`);
  }
}
