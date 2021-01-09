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
import { getCurrentPage } from '../state/tasks.reducer';
import { couldStartTrivia } from 'typescript';

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
    this.getTasks();
    this.todoService.getPagesStore().subscribe((res) => {
      this.pages = Math.ceil(res / 10);
    });
  }

  receiveSearchBoxValue(value: string): void {
    this.searchBoxValue = value;
  }

  receivePageNumber(value) {
    // this.todoService.getCurrentPageStore().subscribe((page) => {
    //   console.log(page);
    // })
    this.currentPage = value;

    this.getTasks();
  }

  choseTask(task: Todo) {
    this.selectedTask = task;
  }

  //with NgRx

  getTasks() {
    this.todoService.getCurrentPageStore().subscribe((page) => {
      console.log(page);
      console.log(this.currentPage);
      if (page != this.currentPage) {
        console.log('ok');
        this.todoService.getTasksByPageStore(this.currentPage);
      } else
        this.todoService.getAllTaskStore().subscribe((res) => {
          console.log('hello');
          if (res.length < 10) {
            this.todoService.getTasksByPageStore(this.currentPage);
          } else {
            this.tasksShow = res.map((task) => {
              return Object.assign({ page: this.currentPage }, task);
            });
          }
        });
    });
  }
  /**
   * Add task action
   */
  addTask(): void {
    const task = this.taskForm.value;

    this.todoService.addTaskStore(task);

    this.todoService.getPagesStore().subscribe((pages) => {
      this.pages = Math.ceil(pages / 10);
      console.log('in add task: ', this.pages);
    });
  }
  /**
   * Delete task action
   */
  removeTask(task: Task): void {
    this.todoService.removeTaskStore(task._id, this.currentPage);

    this.todoService.getPagesStore().subscribe((pages) => {
      this.pages = Math.ceil(pages / 10);
      console.log('in remove task: ', this.pages);
    });
  }

  exportToExcel(): void {
    this.todoService.exportToExcel().subscribe((res: any) => {
      console.log(res);
      let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
      fileSaver.saveAs(blob, 'excel.xlsx');
    });
  }
}
