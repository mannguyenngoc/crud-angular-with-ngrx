import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';

import { TodoComponent } from './todo/todo.component';
import { PomoComponent } from './pomo/pomo.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { FormatTaskName } from './name.pipe';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TextSearchDirective } from './text-search.directive';

import { StoreModule } from '@ngrx/store';
import { reducer} from './state/tasks.reducer';

import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/tasks.effects';
import { TaskListPaginationComponent } from './task-list-pagination/task-list-pagination.component';
import { PaginationInTaskListComponent } from './pagination-in-task-list/pagination-in-task-list.component';
import { AddingFormComponent } from './adding-form/adding-form.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    TodoComponent,
    PomoComponent,
    PomodoroComponent,
    TaskDetailComponent,
    FormatTaskName,
    TaskSearchComponent,
    TextSearchDirective,
    TaskListPaginationComponent,
    PaginationInTaskListComponent,
    AddingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tasks: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([TaskEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
