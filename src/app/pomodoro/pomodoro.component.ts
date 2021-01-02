import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})
export class PomodoroComponent implements OnInit {
  
  @Output() pomodoroColor: EventEmitter<boolean> = new EventEmitter();

  isPomodoro: boolean = true;
  isShortBreak: boolean = false;

  isTicking: boolean = false;

  minute: number = 25;
  second: number = 0;

  myInterval: any;

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (!this.isTicking) clearInterval(this.myInterval);
    else {
      console.log('second: ', this.second);
      if (this.minute < 0) this.minute = 0;
      if (this.second < 0) this.second = 0;

      if (this.second == 0) {
        if (this.minute == 0) clearInterval(this.myInterval);
      }
    }
  }

  showTime(time: number): any {
    if (time < 0) return '00';
    // if (!time && time != 0) return '00';

    if (time < 10) return '0' + time;
    else return time;
  }
  changeState(state: string): void {
    if (state === 'pomodoro') {
      this.isPomodoro = true;
      this.isShortBreak = false;
      this.minute = 25;
      this.second = 0;
      this.isTicking = false;
      clearInterval(this.myInterval);
    } else {
      this.isPomodoro = false;
      this.isShortBreak = true;
      this.minute = 5;
      this.second = 0;
      this.isTicking = false;

      clearInterval(this.myInterval);
    }
  }
  start() {
    this.isTicking = !this.isTicking;

    if (!this.isTicking) clearInterval(this.myInterval);
    else
      this.myInterval = setInterval(() => {
        if (this.second == 0 && this.minute != 0) {
          this.second = 59;
          this.minute--;
        } else this.second--;
      }, 1000);
    console.log('Start count');
  }
}
