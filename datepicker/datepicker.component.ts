import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  stdate:any;

  dateform = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
    myDateRange: new FormControl(''),
  })

  ngOnInit() {
    this.dateform = this.fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      myDateRange: ['', Validators.required],
      myDateRevRange: ['', Validators.required],

    });
  }

  constructor(public fb: FormBuilder, public router: Router) { }

  myDatePickerOptions1: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
  };

  myDatePickerOptions2: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  };

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true,
  };
  
  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.myDatePickerOptions2 = {
      disableUntil: {
        year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
      }
    }
    this.myDateRangePickerOptions= {
      disableUntil: {
        year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
      }
    }  
this.stdate=event.formatted;
  }

  onDateChanged1(event: IMyDateModel) {
    console.log('onDateChanged1(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.myDatePickerOptions1 = {
      disableUntil: {
        year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
      }   
    }
    this.myDateRangePickerOptions= {
      disableSince: {
        year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
      }
    }
    this.dateform.patchValue({
      myDateRange: { beginDate: {
          year: new Date(this.stdate).getFullYear(),
          month: new Date(this.stdate).getMonth() + 1,
          day: new Date(this.stdate).getDate(),
         },
        endDate: {
          year: new Date(event.jsdate).getFullYear(),
          month: new Date(event.jsdate).getMonth() + 1,
          day: new Date(event.jsdate).getDate()
         }   
        }
    });  
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log(event);      
  } 

  onDateRangeChanged1(event: IMyDateRangeModel) {
    console.log(event);
    this.dateform.patchValue({
      start:{
      jsdate: new Date(event.beginJsDate),
      },
      end:{
        jsdate: new Date(event.endJsDate),
        },
      })
  }

}




