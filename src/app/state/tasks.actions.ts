import { Action, createAction, props } from '@ngrx/store';
import { Task } from './task.model';

export const GET_TASKS = '[TASKS] Tasks';
export const GET_TASKS_SUCCESS = '[TASKS] Tasks Success';
export const GET_TASKS_ERROR = '[TASKS] Tasks Error';

export class GetAllTasks implements Action {
  readonly type = GET_TASKS;
}
export class GetAllTasksSuccess implements Action {
  readonly type = GET_TASKS_SUCCESS;

  constructor(public payload: Task[]) { }
}
export class GetAllTasksError implements Action {
  readonly type = GET_TASKS_ERROR;

  constructor(public payload: Error) { }
}
// // export const getTask = createAction('[Task] Get task', props<{ tasks }>());
export const getTask = createAction('[Task] Get task', props<{ tasks: Task[]}>());

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
