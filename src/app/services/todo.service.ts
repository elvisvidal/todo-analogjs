import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../lib/definitions';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = 'http://localhost:5173/api/todo';

  constructor(private http: HttpClient) {}

  listTodo(): Observable<Todo[]> {
    return this.http.get(`${this.apiURL}/list`);
  }
  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiURL}/get/${id}`);
  }
  addTodo(title: string): Observable<Object> {
    return this.http.post(`${this.apiURL}/create`, { title });
  }
  editTodo(id: string, title: string, completed: boolean): Observable<Object> {
    return this.http.put(`${this.apiURL}/edit`, { id, title, completed });
  }
  deleteTodo(id: string): Observable<Object> {
    return this.http.post(`${this.apiURL}/delete`, { id });
  }
}
