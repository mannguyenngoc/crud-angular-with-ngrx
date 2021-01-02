import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { catchError, concatMap, map, mapTo, switchMap } from 'rxjs/operators';

import { TodoService } from '../todo.service';
import { Task } from './task.model';

import * as taskActions from './tasks.actions';
import { addTask, editTask } from './tasks.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  @Effect()
  getAllTask$ = this.actions$.pipe(
    ofType(taskActions.getTask.type),
    concatMap((action: any) => {
      return this.todoService.getAllTask();
      // console.log(listTasks)
      // return listTasks;
    })
  );
  @Effect()
  createTask$ = this.actions$.pipe(
    ofType(taskActions.addTask.type),
    // map((props: Task) => props),
    switchMap((newTask: any) => {
      console.log('newTask', newTask);
      return this.todoService.addTask(newTask.task);
    })
  );

  @Effect()
  removeTask$ = this.actions$.pipe(
    ofType(taskActions.removeTask.type),
    switchMap((newTask: any) => {
      console.log(newTask);
      return this.todoService.removeTask(newTask.taskName);
    })
  );
}
