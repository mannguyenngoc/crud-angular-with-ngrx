import { Component, OnInit, Input } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { ActivatedRoute } from '@angular/router';
// import { couldStartTrivia } from 'typescript';
import { FormGroup, FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';

import { getTaskById, getTask } from '../state/tasks.actions';

import { selectTasks } from '../state/tasks.selectors';
import { Task } from '../state/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task: Task | any;
  listTasks: Task[] = [];

  taskForm: FormGroup | any;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getTask();
    this.getAllTask();
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      priority: new FormControl(''),
    });

    console.log('this task form' + this.taskForm);
  }
  editTask(): void {
    this.todoService.updateTask(this.task).subscribe((task) => {
      console.log(task);
    });
  }
  async getTask() {
    const id = this.route.snapshot.params.id;
    const taskId = id;
    await this.store.dispatch(getTaskById({ taskId }));

    // tại sao ở đây chọn selector khác mới được
    this.task = await this.store.select(selectTasks);
    console.log(11,this.task);
    this.task.subscribe((res) => {
      console.log('res is: ', res);
      this.task = JSON.parse(JSON.stringify(res.task[0]));
      // this.task = [...res.task[0]]
    });

    // this.todoService
    //   .getTask(id)
    //   .subscribe((task) => {
    //     this.task = task;
    //   });
  }
  getAllTask(): void {
    this.todoService.getAllTask().subscribe(async (tasks) => {
      this.listTasks = tasks;
    });
  }
}
