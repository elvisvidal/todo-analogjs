import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Todo } from '../lib/definitions';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = 'http://localhost:5173/api/todo';

  constructor(private http: HttpClient) {}

  listTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiURL}/list`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching todos:', error);
        // Transform the error into an observable
        return throwError(() => new Error('Failed to list todos'));
      }),
    );
  }
  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiURL}/get/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching todo:', error);
        // Transform the error into an observable
        return throwError(() => new Error('Failed to get todo'));
      }),
    );
  }
  addTodo(title: string): Observable<Object> {
    return this.http.post(`${this.apiURL}/create`, { title }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding todo:', error);
        // Transform the error into an observable
        return throwError(() => new Error('Failed to add todo'));
      }),
    );
  }
  editTodo(id: string, title: string, completed: boolean): Observable<Object> {
    return this.http.put(`${this.apiURL}/edit`, { id, title, completed }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error editing todo:', error);
        // Transform the error into an observable
        return throwError(() => new Error('Failed to edit todo'));
      }),
    );
  }
  deleteTodo(id: string): Observable<Object> {
    return this.http.post(`${this.apiURL}/delete`, { id }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting todo:', error);
        // Transform the error into an observable
        return throwError(() => new Error('Failed to delete todo'));
      }),
    );
  }
}
