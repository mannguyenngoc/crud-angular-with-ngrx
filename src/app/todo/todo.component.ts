import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  faFileExcel,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { Task } from '../state/task.model';

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
  // search: string = '';

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
    if (value.toString() != this.currentPage.toString()) {
      this.currentPage = value;
      this.todoService.getTasksByPageStore(this.currentPage.toString());
    }
  }

  choseTask(task: Todo) {
    this.selectedTask = task;
  }

  flag: boolean = false;
  //with NgRx

  getTasks() {
    this.todoService.getAllTaskStore().subscribe((res) => {
      console.log('hello');
      if (res.length < 10 && !this.flag) {
        console.log('that right');
        this.flag = true;
        this.todoService.getTasksByPageStore(this.currentPage.toString());
      } else
        this.tasksShow = res.map((task) => {
          return Object.assign({ page: this.currentPage }, task);
        });
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
    this.flag = false;

    this.todoService.removeTaskStore(task._id, this.currentPage);
  }

  // exportToExcel(): void {
  //   this.todoService.exportToExcel().subscribe((res: any) => {
  //     console.log(res);
  //     let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
  //     fileSaver.saveAs(blob, 'excel.xlsx');
  //   });
  // }
}
