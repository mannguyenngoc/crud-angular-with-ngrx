import { Component, OnInit, Input } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  faFileExcel,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { Store, select } from '@ngrx/store';

import * as fileSaver from 'file-saver';

import {
  retrievedTask,
  addTask,
  removeTask,
  getTask,
} from '../state/tasks.actions';

import { selectTasks } from '../state/tasks.selectors';

import { Task } from '../state/task.model';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  tasks: ReadonlyArray<Task> | any;
  selectedTask: Todo | any;

  searchBoxValue: string = '';

  search: string = '';

  faFileExcel = faFileExcel;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    priority: new FormControl(0),
  });

  constructor(
    private todoService: TodoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getTasks();

    // console.log(this.tasks);
    /*
      this.todoService.getAllTask().subscribe((task) => {
        console.log(222,task);
        this.store.dispatch(retrievedTask({ task }));
      });
    */
  }
  receiveSearchBoxValue(value: string): void {
    this.searchBoxValue = value;
  }
  formatTaskName(name: string) {
    return name + ' haha';
  }
  choseTask(task: Todo) {
    this.selectedTask = task;
  }
  test: Task[] = [];

  //with NgRx
  getTasks(): void {
    /*
    this.todoService.getAllTask().subscribe((tasks) => {
      console.log(tasks);
      this.tasks = tasks;
    });
    */
    this.todoService.getAllTask().subscribe(async (tasks) => {
      await this.store.dispatch(getTask({ tasks }));

      this.tasks = await this.store.select(selectTasks);
      // console.log(this.tasks);

      this.tasks.subscribe((res) => {
        this.tasks = res.tasks.map((task, index) => {
          const page = Math.round(index/10) + 1;
          return Object.assign({page: page}, task);
        });
      });
      console.log(this.tasks);
    });

    // this.tasks = this.store.select(selectTasks);

    // console.log(1111, this.tasks);
  }
  addTask(): void {
    const task = this.taskForm.value;
    this.store.dispatch(addTask({ task }));
  }
  removeTask(task: Task): void {
    console.log('task in remove Task: ', task);
    const taskName = task.name;

    this.store.dispatch(removeTask({ taskName }));
  }
  /*
  addTask(): void {
    this.tasks.push(this.taskForm.value);
    this.todoService.addTask(this.taskForm.value).subscribe((task) => {
      console.log(task);
    });
  }
  
  deleteTask(task: Todo): void {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.todoService.removeTask(task).subscribe((res) => {
      console.log(res);
    });
  }
  
  updateTask(task: Todo): void {
    this.todoService.updateTask(task).subscribe((res) => {
      console.log(res);
    });
  }
  changeTaskState(task: Todo): void {
    task.isFinished = !task.isFinished;
    this.todoService.updateTask(task).subscribe((res) => {
      console.log(res);
    });
  }
  */
  exportToExcel(): void {
    this.todoService.exportToExcel().subscribe((res: any) => {
      console.log(res);
      let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
      //const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, 'excel.xlsx');
    });
  }
}
