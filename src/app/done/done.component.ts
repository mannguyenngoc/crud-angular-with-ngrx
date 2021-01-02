import { Component, OnInit } from '@angular/core';
import {TodoService, Todo} from '../todo.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  taskCompleted: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    this.todoService.getAllTask().subscribe((tasks) => {
      this.taskCompleted = tasks.filter(item => item.isFinished)
    })
  }
}
