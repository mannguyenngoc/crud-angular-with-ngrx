import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TaskListPaginationComponent } from './task-list-pagination/task-list-pagination.component';

const routes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: 'todo',component: TodoComponent },
  { path: 'pomodoro', component: PomodoroComponent },
  { path: 'todo/:id' , component: TaskDetailComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit{
  name: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      console.log(this.name)
    });
  }
}
