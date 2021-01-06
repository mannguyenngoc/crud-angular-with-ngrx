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
    this.createPageNumber();
  }

  handlePaginationNumber(array, selectedPage) {
    let result = array.map((pageNumber) => pageNumber.toString());

    const i = result.indexOf(selectedPage.toString());
    console.log(i);
    if (i == 0) {
      result = [result[0], '...', result[result.length - 1]];
    } else if (i == result.length - 1) {
      result = [result[0], '...', result[result.length - 1]];
    } else {
      i === 1
        ? (result = [result[0], result[1], '...', result[result.length - 1]])
        : i < result.length - 2
        ? (result = [
            result[0],
            '...',
            selectedPage.toString(),
            '...',
            result[result.length - 1],
          ])
        : (result = [
            result[0],
            '...',
            selectedPage.toString(),
            result[result.length - 1],
          ]);
    }

    return result;
  }
  createPageNumber() {
    this.selectedPage =
      parseInt(this.route.snapshot.queryParams.page) | this.selectedPage | 1;

    if (this.paginationNumber.length == 0)
      for (let i = 1; i <= this.pages; i++) {
        this.paginationNumber.push(i);
      }
  }
  changePage(value: number): void {
    this.selectedPage = value;
    this.page.emit(value.toString());
  }
}
