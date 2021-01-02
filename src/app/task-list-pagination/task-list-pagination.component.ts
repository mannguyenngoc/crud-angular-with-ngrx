import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../state/task.model';

import { TodoService, Todo } from '../todo.service';

import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';

import { selectTasks } from '../state/tasks.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list-pagination',
  templateUrl: './task-list-pagination.component.html',
  styleUrls: ['./task-list-pagination.component.css'],
})
export class TaskListPaginationComponent implements OnInit {
  @Input() pages: number = 0;
  
  page: number = 0;

  tasks: ReadonlyArray<Task> | any;
  tasksShow: ReadonlyArray<Task> | any;

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}
  receivePage(value) {
    console.log(value);
    this.page = value;
    this.tasksShow = this.tasks.filter(
      (task) => task.page.toString() === this.page
    );
  }
  ngOnInit(): void {
    this.pages = this.route.snapshot.queryParams.page;

    this.tasks = this.store.select(selectTasks);
    this.tasks.subscribe((res) => {
      this.tasks = res.tasks.map((task, index) => {
        const page = Math.floor(index / 10) + 1;
        return Object.assign({ page: page }, task);
      });
      this.tasksShow = this.tasks.filter(
        (task) => task.page.toString() === this.pages
      );
    });
    this.pages = Math.round(this.tasks.length / 10);
  }

  async getTasks() {}
}
