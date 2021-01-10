import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination-in-task-list',
  templateUrl: './pagination-in-task-list.component.html',
  styleUrls: ['./pagination-in-task-list.component.css'],
})
export class PaginationInTaskListComponent implements OnInit {
  @Input() pages: number = 0;
  @Output() page = new EventEmitter<string>();

  pageDefault: number = 1;

  selectedPage: number = 1;

  paginationNumber: number[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnChanges() {
    this.paginationNumber = [];
    this.createPageNumber();
  }

  ngOnInit(): void {
    const page = parseInt(this.route.snapshot.queryParams.page) || 1;

    this.selectedPage = page;
    this.createPageNumber();
  }

  createPageNumber() {
    // console.log(this.route.snapshot.queryParams.page)

    if (this.paginationNumber.length == 0)
      for (let i = 1; i <= this.pages; i++) {
        this.paginationNumber.push(i);
      }
  }
  changePage(value): void {
    this.selectedPage = value;
    this.page.emit(value.toString());
  }
}
