import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoComponent } from './pomo.component';

describe('PomoComponent', () => {
  let component: PomoComponent;
  let fixture: ComponentFixture<PomoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
