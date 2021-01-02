import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomo',
  templateUrl: './pomo.component.html',
  styleUrls: ['./pomo.component.css'],
})
export class PomoComponent implements OnInit {
  minute: number = 0;
  second: number = 0;

  myInterval: any;

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    console.log('second: ', this.second);
    console.log('checking');
    if (this.minute < 0) this.minute = 0;
    if (this.second < 0) this.second = 0;

    if (this.second == 0) {
      if (this.minute == 0) clearInterval(this.myInterval);
    }
  }
  showTime(time: number): any {
    if (time < 0) return '00';

    if (time < 10) return '0' + time;
    else return time;
  }
  start() {
    this.myInterval = setInterval(() => {
      if (this.second == 0 && this.minute != 0) {
        this.second = 59;
        this.minute--;
      } else this.second--;
    }, 1000);
    console.log('Start count');
  }
}
