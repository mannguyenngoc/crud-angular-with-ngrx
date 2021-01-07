import { Component, OnInit, Input } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  faFileExcel,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import * as fileSaver from 'file-saver';

import { Task } from '../state/task.model';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  tasks: ReadonlyArray<Task> | any = [];
  selectedTask: Todo | any;

  tasksShow: ReadonlyArray<Task> | any = [];

  pages: number = 1;

  currentPage: number = 1;

  searchBoxValue: string = '';

  search: string = '';

  //icon
  faFileExcel = faFileExcel;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    priority: new FormControl(0),
  });

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // this.getTasks();

    this.getTasks();
    this.todoService.getPagesStore().subscribe((res) => {
      this.pages = Math.ceil(res / 10);
    });
  }

  receiveSearchBoxValue(value: string): void {
    this.searchBoxValue = value;
  }

  receivePageNumber(value) {
    this.currentPage = value;

    this.getTasks();
  }

  choseTask(task: Todo) {
    this.selectedTask = task;
  }
  // test: Task[] = [];

  //with NgRx

  // getTasks() {
  //   this.todoService.getAllTaskStore().subscribe((res) => {
  //     // adding property page
  //     this.tasks = res.map((task, index) => {
  //       const page = Math.floor(index / 10) + 1;
  //       return Object.assign({ page: page }, task);
  //     });

  //     console.log('hello tasks', this.tasks);
  //     console.log('current page: ', this.currentPage);

  //     //choose which tasks will be shown
  //     this.tasksShow = this.tasks.filter(
  //       (task) => task.page.toString() === this.currentPage.toString()
  //     );

  //     console.log('hello tasks show', this.tasksShow);

  //     if (this.tasks.length != 0) {
  //       this.pages = this.tasks[this.tasks.length - 1].page;
  //     }
  //   });
  // }

  getTasks() {
    this.todoService.getTasksByPageStore(this.currentPage).subscribe((res) => {
      this.tasksShow = res.map((task)  => {
        return Object.assign({page: this.currentPage}, task)
      });
      console.log(this.tasksShow)
    });
  }
  /**
   * Add task action
   */
  addTask(): void {
    const task = this.taskForm.value;

    this.todoService.addTaskStore(task);
  }
  /**
   * Delete task action
   */
  removeTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t._id != task._id);

    this.todoService.removeTaskStore(task._id);
  }

  exportToExcel(): void {
    this.todoService.exportToExcel().subscribe((res: any) => {
      console.log(res);
      let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
      fileSaver.saveAs(blob, 'excel.xlsx');
    });
  }
}
