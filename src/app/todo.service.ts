import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './state/task.model';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import {
  AddTask,
  GetAllTasks,
  GetCurrentPage,
  GetPages,
  GetTask,
  RemoveTask,
  UpdateTask,
} from './state/tasks.actions';
import {
  getAllTasks,
  getCurrentPage,
  getOneTask,
  getPages,
} from './state/tasks.reducer';

export interface Todo {
  _id: string;
  name: string;
  priority: number;
}
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getTask(id: any): Observable<Todo> {
    return this.http.get<Todo>('http://localhost:3000/api/todo/' + id);
  }
  getAllTask(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/todo');
  }
  getTasksByPage(page: any): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todo/page/' + page);
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

  removeTask(taskId): Observable<Todo> {
    return this.http.delete<Todo>('http://localhost:3000/api/todo/' + taskId);
  }
  updateTask(task: Task): Observable<void> {
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

  /**
   * With store
   */
  getPagesStore() {
    this.store.dispatch(new GetPages());

    return this.store.select(getPages);
  }
  getCurrentPage() {
    this.store.dispatch(new GetCurrentPage());

    return this.store.select(getCurrentPage);
  }
  getTasksByPageStore(page) {
    this.store.dispatch(new GetAllTasks(page));

    return this.store.select(getAllTasks);
  }
  getAllTaskStore() {

    return this.store.select(getAllTasks);
  }
  getTaskStore(id: string) {
    this.store.dispatch(new GetTask(id));

    return this.store.select(getOneTask);
  }
  addTaskStore(task: Task) {
    this.store.dispatch(new AddTask(task));
  }
  updateTaskStore(task: Task) {
    this.store.dispatch(new UpdateTask(task));
  }
  removeTaskStore(id: string) {
    this.store.dispatch(new RemoveTask(id));
  }
}
