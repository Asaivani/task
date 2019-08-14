import { Component, OnInit,ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import interactionPlugin ,{ Draggable } from '@fullcalendar/interaction'; // for dateClick
import { Calendar } from '@fullcalendar/core';
import { stringify } from 'querystring';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
options: OptionsInput;
eventsModel: any;
dd:string;

n:any;
events:any;
  calendarComponent: FullCalendarComponent; // the #calendar in the template
  ngOnInit() {
    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            console.log('clicked the custom button!');
          }
        },
        prev: {
          text: 'custom!',
          click: function () {
            //console.log('clicked the prev button!');
              const dateObj = new Date();
              //console.log(dateObj);
              console.log(dateObj.getFullYear() + '-' + (dateObj.getMonth()));
              const dd=(dateObj.getFullYear() + '-' + (dateObj.getMonth()));       
          }
        },
        next: {
          text: 'custom!',
          click: function () {
            //console.log('clicked the next button!');
            const dateObj = new Date();
            //console.log(dateObj);
            console.log(dateObj.getFullYear() + '-' + (dateObj.getMonth()+2));
            const dd=(dateObj.getFullYear() + '-' + (dateObj.getMonth()+2)); 
          }
        }
      },
      
      
      header: {
        left: 'prev,next,today,myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      plugins: [dayGridPlugin, interactionPlugin]
    };
  
  }
  updateHeader() {
    this.options.header = {
      left: 'prev,next,today, myCustomButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };
    console.log( this.options.header);
  }
  updateEvents() {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
    console.log(this.eventsModel);
  }
  get yearMonth(): string {
    const dateObj = new Date();
    console.log(dateObj);
    console.log(dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1));
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    
  }
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { },
  ];

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    //calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
    calendarApi.render();
  }
  

  // prev(){
  //   var seletedDate = moment(new Date());
  //   console.log(seletedDate);
  //   var pre = moment(seletedDate.add(-1,"M"));
  //   console.log(pre);
  //   seletedDate = pre;
  //   console.log(seletedDate.format('YYYY-MM-DD'));
  // }

  // next(){
  //   var seletedDate = moment(new Date());
  //   var ne = moment(seletedDate.add(1,"M"));
  //   seletedDate = ne;
  //   console.log(seletedDate.format('YYYY-MM-DD'));
  // }
  
  // prev(){
  //   var month = new Array();
  //   month[0] = "January";
  //   month[1] = "February";
  //   month[2] = "March";
  //   month[3] = "April";
  //   month[4] = "May";
  //   month[5] = "June";
  //   month[6] = "July";
  //   month[7] = "August";
  //   month[8] = "September";
  //   month[9] = "October";
  //   month[10] = "November";
  //   month[11] = "December";
  
  //   var d = new Date();
  //   var n = month[d.getMonth()-1];
  //   alert('prev ' + n);
  //   return false;
  // }
  // next(){
  //   var date1 = new Date().getDate()+1;
  //   alert('next ' + date1);
  //   return false;
  // // var month = new Array();
  // // month[0] = "January";
  // // month[1] = "February";
  // // month[2] = "March";
  // // month[3] = "April";
  // // month[4] = "May";
  // // month[5] = "June";
  // // month[6] = "July";
  // // month[7] = "August";
  // // month[8] = "September";
  // // month[9] = "October";
  // // month[10] = "November";
  // // month[11] = "December";

  // // var d = new Date();
  // // var n = month[d.getMonth()+1];
  // // alert('next ' + n);
  // // return false;
  // }
 
    

     handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: prompt('Enter a Event'),
        start: arg.date,
        allDay: arg.allDay
      })
    }
    
    }
    

  constructor() { }

}
