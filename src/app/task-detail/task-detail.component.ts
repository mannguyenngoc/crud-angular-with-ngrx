import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Task } from '../state/task.model';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task: Task | any;
  listTasks: Task[] = [];

  error: string = 'Error';
  isReRender: boolean = false;

  taskClone: Task | any = { _id: '', name: '', priority: 0 };

  taskDetailId: string = '';

  taskForm: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  changeView(value) {
    this.task = value;
  }

  ngOnInit(): void {
    this.getTask();

    // create form
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      priority: new FormControl(''),
    });
  }

  editTask(name: string, priority: string) {
    // make task clone can be edited
    this.taskClone = { _id: '', name: '', priority: 0 };

    this.taskClone._id = this.task._id;
    this.taskClone.name = name;
    this.taskClone.priority = priority;

    // update task in store
    this.todoService.updateTaskStore(this.taskClone);

    this.getTask();
  }

  /**
   * Get 1 task by id
   */
  getTask() {
    const id = this.route.snapshot.params.id;
    const page = this.route.snapshot.queryParams.page || 1;

    this.taskDetailId = id;

    this.todoService.getAllTaskStore().subscribe((tasks) => {
      if (tasks.length > 0) {
        for (let task of tasks) {
          if (task._id === id) {
            this.task = task;
            break;
          }
        }
      } else {
        this.todoService
          .getTaskStore(id)
          .pipe(filter((task) => !!task))
          .pipe(take(1))
          .subscribe((task) => {
            console.log(task);

            this.router.navigate([`/todo/${id}`], {
              queryParams: { page: page },
            });

            this.task = task;
          });
      }
    });
    // this.todoService.getAllTaskStore().subscribe((tasks) => {
    //   console.log(tasks);
    //   console.log(id);
    //   const task = tasks.find((task) => {
    //     return task._id === id;
    //   });

    //   if (task) {
    //     this.task = task;
    //   } else
    //     this.todoService
    //       .getTaskStore(id)
    //       .pipe(filter((task) => !!task))
    //       .pipe(take(1))
    //       .subscribe((task) => {
    //         console.log(task);

    //         this.router.navigate([`/todo/${id}`], {
    //           queryParams: { page: page },
    //         });

    //         this.task = task;
    //         // }
    //       });
    // });
  }
}
