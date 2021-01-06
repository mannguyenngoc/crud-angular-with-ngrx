import { Action, createAction, props } from '@ngrx/store';
import { Task } from './task.model';

export const GET_TASKS = '[TASKS] Tasks';
export const GET_TASKS_SUCCESS = '[TASKS] Tasks Success';
export const GET_TASKS_ERROR = '[TASKS] Tasks Error';

export const GET_TASK = '[GET] Task';
export const GET_TASK_SUCCESS = '[GET] Task Success';
export const GET_TASK_ERROR = '[GET] Task Error';

export const UPDATE_TASK = '[UPDATE] Task';
export const UPDATE_TASK_SUCCESS = '[UPDATE] Task Success';
export const UPDATE_TASK_ERROR = '[UPDATE] Task Error';

export const CREATE_TASK =  '[ADD] Task';
export const CREATE_TASK_SUCCESS = '[ADD] Task Success';
export const CREATE_TASK_ERROR =  '[ADD] Task Error';

export const DELETE_TASK = '[DELETE] TASK';
export const DELETE_TASK_SUCCESS = '[DELETE] TASK Success';
export const DELETE_TASK_ERROR = '[DELETE] Task Error';

export class GetAllTasks implements Action {
  readonly type = GET_TASKS;
}
export class GetAllTasksSuccess implements Action {
  readonly type = GET_TASKS_SUCCESS;

  constructor(public payload: Task[]) {}
}
export class GetAllTasksError implements Action {
  readonly type = GET_TASKS_ERROR;

  constructor(public payload: Error) {}
}
export class GetTask implements Action {
  readonly type = GET_TASK;

  constructor(public payload: string) {}
}
export class GetTaskSuccess implements Action {
  readonly type = GET_TASK_SUCCESS;

  constructor(public payload: Task) {}
}
export class GetTaskError implements Action {
  readonly type = GET_TASK_ERROR;

  constructor(public payload: Error) {}
}
export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;

  constructor(public payload: Task) {}
}
export class UpdateTaskSuccess implements Action {
  readonly type = UPDATE_TASK_SUCCESS;
}
export class UpdateTaskError implements Action {
  readonly type = UPDATE_TASK_ERROR;

  constructor(public payload: Error) {}
}
export class AddTask implements Action {
  readonly type =  CREATE_TASK;

  constructor(public payload: Task) {}
}
export class AddTaskSuccess implements Action {
  readonly type = CREATE_TASK_SUCCESS;

  constructor(public payload: string) {}
}
export class AddTaskError implements Action {
  readonly type = CREATE_TASK_ERROR;

  constructor(public payload: Error) {}
}
export class RemoveTask implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: string) {}
}
export class RemoveTaskSuccess implements Action {
  readonly type = DELETE_TASK_SUCCESS;

  constructor(public payload: Task) {}
}
export class RemoveTaskError implements Action {
  readonly type = DELETE_TASK_ERROR;

  constructor(public payload: Error) {}
}
// // export const getTask = createAction('[Task] Get task', props<{ tasks }>());
export const getTask = createAction(
  '[Task] Get task',
  props<{ tasks: Task[] }>()
);

// export const getTask = createAction('[Task] Get task');

// export class GetTaskSuccess implements Action {
//   readonly type = GET_TASKS_SUCCESS;

//   constructor(public payload: Task) {}
// }
export const addTask = createAction('[Task] Add task', props<{ task }>());
export const removeTask = createAction(
  '[Task] Remove task',
  props<{ taskName }>()
);
export const getTaskById = createAction(
  '[Task] Get task by id',
  props<{ taskId }>()
);

// chưa làm reducer
export const editTask = createAction('[Task] Edit task', props<{ task }>());

export const retrievedTask = createAction(
  '[List/API] Retrieve task',
  props<{ task }>()
);
