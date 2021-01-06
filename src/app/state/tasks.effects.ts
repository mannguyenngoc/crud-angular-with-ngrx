import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { catchError, concatMap, map, mapTo, switchMap } from 'rxjs/operators';

import { TodoService } from '../todo.service';
import { Task } from './task.model';

import * as taskActions from './tasks.actions';
import {
  AddTask,
  addTask,
  AddTaskError,
  AddTaskSuccess,
  editTask,
  RemoveTask,
  RemoveTaskSuccess,
  RemoveTaskError,
} from './tasks.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  @Effect()
  getAllTask$ = this.actions$.pipe(
    ofType(taskActions.GET_TASKS),
    switchMap(() => this.todoService.getAllTask()),
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
      return action.payload
    }),
    switchMap((id) => this.todoService.getTask(id)),
    map((task) => new taskActions.GetTaskSuccess(task)),
    catchError((err) => [new taskActions.GetTaskError(err)])
  );
  @Effect()
  updateTask$ = this.actions$.pipe(
    ofType(taskActions.UPDATE_TASK),
    map((action: taskActions.UpdateTask) => {
      console.log(action);
      return action.payload;
    }),
    switchMap((task) => this.todoService.updateTask(Object.assign({isFinished: false}, task))),
    map(() => {
      console.log('hello i am map');
      return new taskActions.UpdateTaskSuccess();
    }),
    catchError((err) => [new taskActions.UpdateTaskError(err)])
  );

  @Effect()
  // createTask$ = this.actions$.pipe(
  //   ofType(taskActions.addTask.type),
  //   // map((props: Task) => props),
  //   switchMap((newTask: any) => {
  //     console.log('newTask', newTask);
  //     return this.todoService.addTask(newTask.task);
  //   }),
  //   map((res) => {
  //     console.log(res);
  //   })
  // );
  createTask$ = this.actions$.pipe(
    ofType(taskActions.CREATE_TASK),
    map((action: AddTask) => action.payload),
    switchMap((newTask) => this.todoService.addTask(newTask)),
    map((res) => new AddTaskSuccess(res.id)),
    catchError((err) => [new AddTaskError(err)])
  );

  @Effect()
  // removeTask$ = this.actions$.pipe(
  //   ofType(taskActions.removeTask.type),
  //   switchMap((newTask: any) => {
  //     console.log(newTask);
  //     return this.todoService.removeTask(newTask.taskName);
  //   })
  // );
  removeTask$ = this.actions$.pipe(
    ofType(taskActions.DELETE_TASK),
    map((action: RemoveTask) => action.payload),
    switchMap(id => this.todoService.removeTask(id)),
    map((task: Task) => new RemoveTaskSuccess(task)),
    catchError((err) => [new RemoveTaskError(err)])
  )
}
