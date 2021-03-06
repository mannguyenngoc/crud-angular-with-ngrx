import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as taskActions from './tasks.actions';
import { addTask, getTask, getTaskById, removeTask } from './tasks.actions';
import { Task } from './task.model';
import { AppAction } from './app.action';

export interface TaskArrayState {
  tasks: Task[];
  selected: Task | any;
  action: string | any;
  done: boolean;
  error?: Error | any;
  pages: number;
  currentPage: number;
  pageIndex: number;
}
const initialArrayState: TaskArrayState = {
  tasks: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  pages: 0,
  currentPage: 0,
  pageIndex: 0,
};

export function reducer(state = initialArrayState, action: AppAction) {
  switch (action.type) {
    case taskActions.GET_PAGES:
      return {
        ...state,
        action: taskActions.GET_PAGES,
        done: false,
        selected: null,
      };
    case taskActions.GET_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.payload,
      };
    case taskActions.GET_CURRENT_PAGE:
      return {
        ...state,
        action: taskActions.GET_CURRENT_PAGE,
        done: false,
        selected: null,
      };
    case taskActions.GET_CURRENT_PAGE_SUCCESS:
      return {
        ...state,
        currentPage: action.payload,
      };
    case taskActions.GET_TASKS: {
      return {
        ...state,
        action: taskActions.GET_TASKS,
        done: false,
        selected: null,
        error: null,
        currentPage: parseInt(action.payload),
        pageIndex: parseInt(action.payload),
      };
    }
    case taskActions.GET_TASKS_SUCCESS: {
      console.log(action);
      return {
        ...state,
        done: true,
        selected: null,
        tasks: action.payload,
      };
    }
    /**
     * Get task by id
     */
    case taskActions.GET_TASK:
      // {
      //   console.log(action);
      //   console.log(state.tasks);
      //   var task = state.tasks.find((task) => task._id === action.payload);
      //   console.log(task);
      // }
      return {
        ...state,
        action: taskActions.GET_TASK,
        done: false,
        selected: null,
        error: null,
      };
    case taskActions.GET_TASK_SUCCESS: {
      console.log(action);
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null,
      };
    }

    case taskActions.GET_TASK_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload,
      };
    case taskActions.UPDATE_TASK: {
      return {
        ...state,
        selected: action.payload,
        tasks: state.tasks.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload;
          } else return task;
        }),
        action: taskActions.UPDATE_TASK,
        done: false,
        error: null,
      };
    }

    case taskActions.UPDATE_TASK_SUCCESS: {
      console.log(state);
      const index = state.tasks.findIndex((h) => h._id === state.selected._id);
      console.log(index);
      if (index >= 0) {
        return {
          ...state,
          done: true,
          // selected: state.selected,
          selected: null,
          error: null,
        };
      }
      return state;
    }
    case taskActions.UPDATE_TASK_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload,
      };
    case taskActions.CREATE_TASK: {
      console.log(action.payload);
      return {
        ...state,
        selected: action.payload,
        action: taskActions.CREATE_TASK,
        done: false,
        error: null,
      };
    }
    case taskActions.CREATE_TASK_SUCCESS: {
      const newTask = action.payload;
      console.log(newTask);
      let tasks: any = [];
      if (state.tasks.length < 10) {
        tasks = [...state.tasks, newTask];
      } else tasks = state.tasks;
      console.log(tasks);
      return {
        ...state,
        tasks,
        selected: null,
        error: null,
        done: true,
        pages: state.pages + 1
      };
    }
    case taskActions.CREATE_TASK_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload,
      };
    case taskActions.DELETE_TASK: {
      const selected = state.tasks.find((h) => h._id === action.payload);
      return {
        ...state,
        // selected,
        tasks: state.tasks.filter((h) => h._id !== action.payload),
        action: taskActions.DELETE_TASK,
        done: true,
        error: null,
        pages: state.pages-1
      };
    }
    case taskActions.DELETE_TASK_SUCCESS: {
      const tasks = state.tasks.filter((h) => h._id != state.selected._id);
      return {
        ...state,
        tasks,
        selected: null,
        error: null,
        done: true,
      };
    }
    case taskActions.DELETE_TASK_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload,
      };
  }

  return state;
}

/*
  SELECTORS
 */
export const getTaskState = createFeatureSelector<TaskArrayState>('tasks');
export const getAllTasks = createSelector(
  getTaskState,
  (state: TaskArrayState) => {
    console.log('state now: ', state);
    return state.tasks;
  }
);
export const getPages = createSelector(
  getTaskState,
  (state: TaskArrayState) => {
    return state.pages;
  }
);
export const getCurrentPage = createSelector(
  getTaskState,
  (state: TaskArrayState) => {
    return state.currentPage;
  }
);
export const getOneTask = createSelector(
  getTaskState,
  (state: TaskArrayState) => {
    console.log('state nwwwwww: ', state);
    if (state.action === taskActions.GET_TASK) {
      console.log(state.selected);
      return state.selected;
    } else return null;
  }
);

/**
 * new versions
 */
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
    console.log('task in reducer ', task);
    return {
      ...state,
      task,
    };
  })
);
