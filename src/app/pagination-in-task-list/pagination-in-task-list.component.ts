import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination-in-task-list',
  templateUrl: './pagination-in-task-list.component.html',
  styleUrls: ['./pagination-in-task-list.component.css'],
})
export class PaginationInTaskListComponent implements OnInit {
  @Input() pages: number = 2;
  @Output() page = new EventEmitter<string>();

  selectedPage: number = 1;
  
  paginationNumber: number[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedPage = parseInt(this.route.snapshot.queryParams.page);
    for (let i = 1; i <= this.pages; i++) {
      this.paginationNumber.push(i);
    }
  }
  changePage(value: number): void {
    console.log(value);
    this.selectedPage = value;
    this.page.emit(value.toString());
  }
}
