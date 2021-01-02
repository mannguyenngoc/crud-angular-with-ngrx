import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.state';
import { Task } from './task.model';

const selectTask = (state: AppState) => state.tasks;
// const selectedTask = (state: AppState) => state.task;

export const selectTasks = createSelector(
  selectTask,
  (tasks) => {
    console.log('tasks in selectors is: ', tasks);
    return tasks;
  }
);

// export const selectOneTask = createSelector(
//   selectedTask,
//   (task) => {
//     console.log('selected task: ', task);

//     return task;
//   }
// )