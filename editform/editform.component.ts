import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms' ;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss']
})
export class EditformComponent implements OnInit {
  arr:any=[];

  disabled=false;
  showFilter=false;
  limitSelection=false;
  states:any=[];
  selectedItems:any=[];
  dropdownSettings:any={};
  selectedState:any;

  regisform = new FormGroup({
    name: new FormControl(''),
    dob:new FormControl(''),
    mail:new FormControl(''),
    ph:new FormControl(''),
    state:new FormControl(''),
    gender: new FormControl(''),
    dpmid: new FormControl(''),
    password:new FormControl(''),
    doj:new FormControl(''),
    check:new FormControl('')
  })

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

  constructor(public fb: FormBuilder,private http:HttpClient,public service:AppService,private router:Router) { }

  onDateChanged(event: IMyDateModel){}
  ngOnInit() {
    this.regisform= this.fb.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      dob: ['',[Validators.required]],
      mail: ['',[Validators.required,Validators.email]],
      ph:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      //state:['',[Validators.required]],
      states:[this.selectedState],
      gender:['',[Validators.required]],
      dpmid: ['',[Validators.required,Validators.pattern("[0-8]{1}")]],
      password:['',[Validators.required,Validators.minLength(6)]],
      doj:['',[Validators.required]],
      check:['',[Validators.requiredTrue]],
    });

    this.regisform.patchValue(
      {name:this.service.data.Name,
        dob:this.service.data. DateofBirth,
        mail:this.service.data. Email,
        ph:this.service.data.PhoneNumber,
        state:this.service.data.State,
        gender:this.service.data.Gender,
        dpmid:this.service.data.DepartmentsId,
        password:this.service.data.password,
      }
    )

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

  save(data){
    data['dob']=moment(data.dob.formatted).format('YYYY-MM-DD');
    data['states']=this.selectedState;
    data['doj']=moment(data.doj.formatted).format('YYYY-MM-DD');
    //console.log(data['doj']);
    this.service.update(data,this.service.data.Id)
    .subscribe((res:Request)=>{
      this.arr=res;
      //console.log(this.arr);
      
    },
    error=>{console.error();
    })
      if(data['dob']<data['doj'])
      {
        //console.log(data);
        this.router.navigate(["success"]);
      }
      else{
        alert("date of joining must be larger");
      }

    
  //   this.http.post('http://localhost:5000/api/edit',)
  // .subscribe((res:Response)=>{
  //   },
  //   error=>{console.error();
  //   })
  //   //this.router.navigate(["success"]);
  // }
  }
  
}
