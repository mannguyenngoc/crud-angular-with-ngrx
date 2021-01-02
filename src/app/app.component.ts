import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from './state/app.state';
import { getTask } from './state/tasks.actions';

import { Task } from './state/task.model';
import { selectTasks } from './state/tasks.selectors';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';

// directive, modify pipe, search, detail, listing, convert to reactive form, template driven form, reactive form
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'To do list';
  tasks: Task[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const tasks = this.tasks;
    this.store.dispatch(getTask({tasks}));

    this.store.select(selectTasks).subscribe((res) => {
      console.log(res);
    })
  }
  // ngOnInit() {
  //   const tasks = this.tasks;
  //   this.store.dispatch(getTask({ tasks }));

  //   this.store.select(selectTasks).subscribe((res) => {
  //     return res
  //   })
  // }
  direction: string = window.location.href.slice(22);

  changeDirection(direction: string): void {
    this.direction = direction;
  }
}
