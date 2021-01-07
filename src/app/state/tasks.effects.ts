import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';

import { TodoService } from '../todo.service';
import { Task } from './task.model';

import * as taskActions from './tasks.actions';
import {
  AddTask,
  AddTaskError,
  AddTaskSuccess,
  RemoveTask,
  RemoveTaskSuccess,
  RemoveTaskError,
} from './tasks.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  @Effect()
  getPages$ = this.actions$.pipe(
    ofType(taskActions.GET_PAGES),
    switchMap(() => this.todoService.getAllTask()),
    map((pages) => {
      return new taskActions.GetPagesSuccess(pages);
    })
  );

  @Effect()
  getAllTask$ = this.actions$.pipe(
    ofType(taskActions.GET_TASKS),
    map((action: taskActions.GetAllTasks) => {
      console.log(action);
      return action.payload;
    }),
    switchMap((page) => this.todoService.getTasksByPage(page)),
    map((tasks) => {
      console.log(tasks);
      return new taskActions.GetAllTasksSuccess(tasks);
    }),
    catchError((err) => [new taskActions.GetAllTasksError(err)])
  );
  @Effect()
  getTask$ = this.actions$.pipe(
    ofType(taskActions.GET_TASK),
    map((action: taskActions.GetTask) => {
      console.log(action);
      return action.payload;
    }),
    switchMap((id) => this.todoService.getTask(id)),
    map((task) => {
      return new taskActions.GetTaskSuccess(task);
    }),
    catchError((err) => [new taskActions.GetTaskError(err)])
  );
  @Effect()
  updateTask$ = this.actions$.pipe(
    ofType(taskActions.UPDATE_TASK),
    map((action: taskActions.UpdateTask) => {
      console.log(action);
      return action.payload;
    }),
    switchMap((task) => {
      console.log(task);
      return this.todoService.updateTask(
        Object.assign({ isFinished: false }, task)
      );
    }),
    map(() => {
      console.log('hello i am map');
      return new taskActions.UpdateTaskSuccess();
    }),
    catchError((err) => [new taskActions.UpdateTaskError(err)])
  );

  @Effect()
  createTask$ = this.actions$.pipe(
    ofType(taskActions.CREATE_TASK),
    map((action: AddTask) => action.payload),
    switchMap((newTask) => this.todoService.addTask(newTask)),
    map((res) => {
      console.log(res);
      return new AddTaskSuccess(res);
    }),
    catchError((err) => [new AddTaskError(err)])
  );

  @Effect()
  removeTask$ = this.actions$.pipe(
    ofType(taskActions.DELETE_TASK),
    map((action: RemoveTask) => action.payload),
    switchMap((id) => this.todoService.removeTask(id)),
    map((task: Task) => new RemoveTaskSuccess(task)),
    catchError((err) => [new RemoveTaskError(err)])
  );
}
