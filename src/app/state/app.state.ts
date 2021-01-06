import {Task} from './task.model';

export interface AppState {
    tasks: ReadonlyArray<Task>,
    task: Task
}