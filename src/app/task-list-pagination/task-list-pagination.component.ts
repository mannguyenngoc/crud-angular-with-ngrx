import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../state/task.model';

import { TodoService, Todo } from '../todo.service';

import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';

import { selectTasks } from '../state/tasks.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { getAllTasks, getCurrentPage } from '../state/tasks.reducer';

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

  page: number = 1;

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

    console.log('hello');
    // xử lý ở route khi pagination ở một trang khác.
    this.router.navigate([`/todo/${this.taskDetailId}`], {
      queryParams: { page: this.page },
    });
    this.getTasks(this.page);
  }

  ngOnInit(): void {
    const page = parseInt(this.route.snapshot.queryParams.page) || 1;

    this.todoService.getPagesStore().subscribe((pages) => {
      this.totalPages = Math.ceil(pages / 10);
    });

    this.getTasks(page);
  }

  getTasks(currentPage) {
    if (this.currentPage.toString() != currentPage.toString()) {
      this.currentPage = currentPage;

      this.todoService.getTasksByPageStore(this.currentPage);
    }
    
    this.todoService.getAllTaskStore().subscribe((res) => {
      this.tasksShow = res.map((task) => {
        return Object.assign({ page: this.currentPage }, task);
      });
    });
  }
}
