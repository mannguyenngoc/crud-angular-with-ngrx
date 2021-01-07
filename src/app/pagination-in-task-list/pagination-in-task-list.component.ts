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
    console.log('1: ', this.selectedPage)
    const page = parseInt(this.route.snapshot.queryParams.page) || 1
    console.log(page)
    this.selectedPage = page;
    this.createPageNumber();
  }

  handlePaginationNumber(array, selectedPage) {
    let result = array.map((pageNumber) => pageNumber.toString());

    let i = result.indexOf(selectedPage.toString());
    if (i === -1) {
      console.log(array);
      console.log(result);
      i = array[array.length - 1];
      selectedPage = i;
    }
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
