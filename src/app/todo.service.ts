import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './state/task.model';

export interface Todo {
  _id: string;
  name: string;
  priority: number;
  isFinished: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTask(id: any): Observable<Todo> {
    return this.http.get<Todo>('http://localhost:3000/api/todo/' + id)
  }
  getAllTask(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todo');
  }
  getAllTaskCompleted(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todo/completed');
  }
  addTask(task: Task): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/todo', task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    });
  }
  removeTask(taskName): Observable<Todo> {
    return this.http.delete<Todo>(
      'http://localhost:3000/api/todo/' + taskName
    );
  }
  updateTask(task: Todo): Observable<void> {
    return this.http.put<void>(
      'http://localhost:3000/api/todo/' + task._id,
      task
    );
  }
  exportToExcel(): any {
    return this.http.get('http://localhost:3000/export', {
      responseType: 'blob',
    });
  }
}
