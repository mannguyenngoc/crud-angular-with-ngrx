import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService, Todo } from '../todo.service';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css'],
})
export class TaskSearchComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  tasks: Todo[] = [];

  tasksByName: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTask().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  searchTask(e): void {
    this.newItemEvent.emit(e);
    e = e.trim();
    e = e.toLowerCase();
    this.tasksByName = [];
    for (let task of this.tasks) {
      if (~task.name.toLowerCase().indexOf(e) && this.tasksByName.indexOf(task) == -1 && e != '') {
        this.tasksByName.push(task);
      }
    }
  }
}
