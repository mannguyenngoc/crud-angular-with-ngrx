import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../state/task.model';

import { TodoService, Todo } from '../todo.service';

import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';

import { selectTasks } from '../state/tasks.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { getAllTasks } from '../state/tasks.reducer';

@Component({
  selector: 'app-task-list-pagination',
  templateUrl: './task-list-pagination.component.html',
  styleUrls: ['./task-list-pagination.component.css'],
})
export class TaskListPaginationComponent implements OnInit {
  @Input() taskDetailId: string = '';

  @Output() changeTaskDetailView = new EventEmitter<Task>();

  currentPage: number = 0;

  totalPages: number = 0;

  page: number = 0;

  tasks: ReadonlyArray<Task> | any;
  tasksShow: ReadonlyArray<Task> | any;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  sayHello(task: Task) {
    console.log(task);
    this.changeTaskDetailView.emit(task);
  }
  
  // hàm nhận giá trị output từ child component
  receivePage(value) {
    this.page = value;

    // xử lý ở route khi pagination ở một trang khác.
    this.router.navigate([`/todo/${this.taskDetailId}`], {
      queryParams: { page: this.page },
    });

    this.tasksShow = this.tasks.filter(
      (task) => task.page.toString() === this.page
    );
  }
  ngOnInit(): void {
    this.todoService.getAllTaskStore().subscribe((res) => {
      // lay query params
      this.currentPage = this.route.snapshot.queryParams.page;

      // them property page vao moi object
      this.tasks = res.map((task, index) => {
        const page = Math.floor(index / 10) + 1;
        return Object.assign({ page: page }, task);
      });

      this.tasksShow = this.tasks.filter((task) => {
        return task.page.toString() === this.currentPage;
      });
    });

    this.totalPages = Math.ceil(this.tasks.length / 10);
  }
}
