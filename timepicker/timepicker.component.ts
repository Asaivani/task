import { Component, OnInit } from '@angular/core';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct,NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class TimepickerComponent implements OnInit {
  now:any = new Date();
  today:any = new Date();
  //time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  time:NgbTimeStruct = {hour:this.today.getHours(), minute: this.today.getMinutes() , second:this.today.getSeconds()};
  //fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  constructor(config: NgbTimepickerConfig,calendar: NgbCalendar) { 
    config.seconds = true;
    config.spinners = false;
    //this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);
    //console.log(this.fromDate);
    console.log(this.toDate);
    
    
  }
//   selectThisMonth() {
//     let year = this.now.getFullYear();
//     let month = this.now.getMonth();
//     let day = this.now.getDate();
//     //let day = new Date(year, month, 0).getDate();
//     this.toDate = {year: year, month: month, day: day};
//     console.log(this.toDate);
    
// }
  ngOnInit() {
  }

}
