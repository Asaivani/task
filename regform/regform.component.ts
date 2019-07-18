import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms' ;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.scss']
})
export class RegformComponent implements OnInit {
  data:any=[];
  time:any;
  // dob:any;
  // doj:any;
  
  

  

 

  disabled=false;
  showFilter=false;
  limitSelection=false;
  states:any=[];
  selectedItems:any=[];
  dropdownSettings:any={};
  selectedState:any;

  myDate = moment().format('YYYY-MM-DD')
  private today = new Date();
  
  public myDatePickerOptions1: IMyDpOptions = {
    dateFormat: 'yyyy.mm.dd',
    disableUntil: {year: 1994, month: 1, day: 1},
    disableSince: {year: 2000, month: 12, day: 31}
};

public myDatePickerOptions2: IMyDpOptions = {
  dateFormat: 'yyyy.mm.dd',
  //disableUntil: {year: 2018, month: 1, day: 1},
  disableSince: {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1}
};

// public myDatePickerOptions3: IMyDpOptions = {
//   dateFormat: 'yyyy.mm.dd',
//   disableUntil: {year: 2015, month: 1, day: 1},
//   disableSince: {year: 2015, month: 12, day: 31} 
// };


// public myDatePickerOptions4: IMyDpOptions = {
//   dateFormat:'yyyy.mm.dd',
//   disableUntil: {year: 2016, month: 1, day: 1},
//   disableSince: {year: 2016, month: 12, day: 31}
// };




regisform = new FormGroup({
  name: new FormControl(''),
  dob:new FormControl(''),
  // from:new FormControl(''),
  // to:new FormControl(''),
  mail:new FormControl(''),
  ph:new FormControl(''),
  state:new FormControl(''),
  gender: new FormControl(''),
  dpmid:new FormControl(''),
  password:new FormControl(''),
  doj:new FormControl(''),
  check:new FormControl('')
})

  constructor(public fb: FormBuilder,private http:HttpClient,public logform : Router) { }
 

  ngOnInit() {
    this.regisform= this.fb.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      dob: ['',[Validators.required]],
      // from:['',[Validators.required]],
      // to:['',[Validators.required]],
      mail: ['',[Validators.required,Validators.email]],
      ph:['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
      //state:['',[Validators.required]],
      states:[this.selectedState],
      gender:['',[Validators.required]],
      dpmid: ['',[Validators.required,Validators.pattern("[0-8]{1}")]],
      password:['',[Validators.required,Validators.minLength(6)]],
      doj:['',[Validators.required]],
      check:['',[Validators.requiredTrue]],

  
    });
   

    this.states=[
      {item_id:1,item_text:'Andhra Pradesh'},
      {item_id:2,item_text:'Delhi'},
      {item_id:3,item_text:'Goa'},
      {item_id:4,item_text:'Kerala'},
      {item_id:5,item_text:'Madhya Pradesh'},
      {item_id:6,item_text:'Karnataka'},
      {item_id:7,item_text:'Maharashtra'},
      {item_id:8,item_text:'Tamil Nadu'},
      {item_id:9,item_text:'West Bengal'},
      {item_id:10,item_text:'Orissa'},
    ]

   
    this.dropdownSettings={
      singleSelection:false,
      idField:'item_id',
      textField:'item_text',
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      itemsShowLimit:3,
      allowSearchFilter:this.showFilter
    };
  }
 

  onItemSelect(item:any){
    console.log(item.item_text)
    this.selectedItems.push(item.item_text);

    this.selectedState=this.selectedItems.toString();
   // this.selectedItems= _.pluck(item,'item_text');
      //console.log(this.selectedItems);
      //console.log(this.selectedState);
  }
  onSelectAll(item:any){
    console.log('onSelectAll',item)
  }
  onDateChanged(event: IMyDateModel){}
  

onsubmit(f){
  //this.data.push(this.regisform.value);
 f['dob']=moment(f.dob.formatted).format('YYYY-MM-DD');
//  f['from']=moment(f.from.formatted).format('YYYY-MM-DD');
//  f['to']=moment(f.to.formatted).format('YYYY-MM-DD');
 f['doj']=moment(f.doj.formatted).format('YYYY-MM-DD');
 f['states']=this.selectedState;
  //this.data=this.regisform.value; 
  // this.http.post('http://localhost:5000/api/details',f)
  console.log(f);
   this.http.post('http://localhost:5001/api/details',f)
  .subscribe((res:Response)=>{
    f=res;
    console.log(f);
    },
    error=>{console.error();
    })
    console.log(f);
    if(f['dob']<f['doj'])
    {
      this.logform.navigate(["success"]);
    }
    else
    {
      alert("date of joining must be larger");
    }
  // this.data=[];
  //f.reset();

  
    
  }
}






