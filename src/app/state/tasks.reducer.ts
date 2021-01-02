import { createReducer, on, Action } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as taskActions from './tasks.actions';
import { addTask, getTask, getTaskById, removeTask } from './tasks.actions';
import { Task } from './task.model';
import { AppState } from './app.state';
// import { AppAction } from './app.action';
import { switchMapTo } from 'rxjs/operators';
import { AppAction } from './app.action';


// export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export interface TaskArrayState {
  tasks: Task[];
  selected: Task | any;
  action: string | any;
  done: boolean;
  error?: Error | any;
}
export interface TaskState {
  task: Task;
}
const initialArrayState: TaskArrayState = {
  tasks: [],
  selected: null,
  action: null,
  done: false,
  error: null,
};

const initialState: TaskState = {
  task: {
    _id: '',
    name: '',
    priority: 0,
  },
};

export function reducer(state = initialState, action: AppAction) {
  switch(action.type) {
    case taskActions.GET_TASKS:
      return {
        ...state,
        action: taskActions.GET_TASKS,
        done: false,
        selected: null,
        error: null
      };
    case taskActions.GET_TASKS_SUCCESS:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      }
  }

  return state;
}
export const taskReducer = createReducer(
  initialArrayState,
  on(getTask, (state, props) => {
    console.log(state);
    return {
      ...state,
      tasks: props.tasks,
      // done: true,
      // action: getTask.type,
      // selected: null,
      // error: null
    };
  }),
  on(addTask, (state, props) => {
    const tasks = [...state.tasks, props.task];

    console.log('tasks in reducer: ', tasks);
    return {
      ...state,
      tasks,
    };
  }),
  on(removeTask, (state, props) => {
    const tasks = state.tasks.filter((task) => task.name != props.taskName);
    return {
      ...state,
      tasks,
    };
  }),
  on(getTaskById, (state, props) => {
    const task = state.tasks.filter((task) => task._id === props.taskId);
    console.log('task in reducer ',task)
    return {
      ...state,
      task
    }
  })
);

// export function reducer(state = initialArrayState, action: AppAction): TaskArrayState {
//   switch(action.type) {
//     case taskActions.GET_TASKS_SUCCESS:
//       return {
//         ...state,
//         tasks: action.payload
//       }
//   }

//   return state;
// }