import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';

import { TodoComponent } from './todo/todo.component';
import { DoneComponent } from './done/done.component';
import { PomoComponent } from './pomo/pomo.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { FormatTaskName } from './name.pipe';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TextSearchDirective } from './text-search.directive';

import { StoreModule } from '@ngrx/store';
import { reducer, taskReducer } from './state/tasks.reducer';

import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/tasks.effects';
import { TaskListPaginationComponent } from './task-list-pagination/task-list-pagination.component';
import { PaginationInTaskListComponent } from './pagination-in-task-list/pagination-in-task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    TodoComponent,
    DoneComponent,
    PomoComponent,
    PomodoroComponent,
    TaskDetailComponent,
    FormatTaskName,
    TaskSearchComponent,
    TextSearchDirective,
    TaskListPaginationComponent,
    PaginationInTaskListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tasks: reducer }),
    EffectsModule.forRoot([TaskEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
