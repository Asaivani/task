import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms' ;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-dateboot',
  templateUrl: './dateboot.component.html',
  styleUrls: ['./dateboot.component.scss']
})
export class DatebootComponent implements OnInit {


  bootform = new FormGroup({
    name: new FormControl(''),
    dob:new FormControl(''),
    dater:new FormControl(''),
    mail:new FormControl(''),
    ph:new FormControl(''),
    password:new FormControl(''),
    check:new FormControl('')
  })

  myDate = moment().format('YYYY-MM-DD')

  constructor(public fb: FormBuilder,private http:HttpClient,public service:AppService,private router:Router) { }

  ngOnInit() {
    this.bootform= this.fb.group({
      name: [this.bootform.value.name,[Validators.required,Validators.minLength(5)]],
      dob: ['',[Validators.required]],
      dater: ['',[Validators.required]],
      mail: ['',[Validators.required,Validators.email]],
      ph:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      password:['',[Validators.required,Validators.minLength(6)]],
      check:['',[Validators.requiredTrue]],
    });
  }

  newreg(item){
     item['dob']=moment(item.dob.formatted).format('YYYY-MM-DD');
     item['dater']=moment(item.dater.formatted).format('YYYY-MM-DD-YYYY-MM-DD');
    console.log(item);
  }

}
