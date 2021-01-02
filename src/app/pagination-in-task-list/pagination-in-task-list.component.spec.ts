import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationInTaskListComponent } from './pagination-in-task-list.component';

describe('PaginationInTaskListComponent', () => {
  let component: PaginationInTaskListComponent;
  let fixture: ComponentFixture<PaginationInTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationInTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationInTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
