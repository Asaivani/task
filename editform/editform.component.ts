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
arr:any;
bdate: any;
jdate: any;
b: number;
j: number;
disabled=false;
ShowFilter=false;
limitSelection=false;

array:any=[];
n:number;
states:any=[];
selectedItems:any=[];
selectedItem:any=[];
selectedState:any=[];
dropdownSettings:any={};

array1:any=[];
n1: number;
shifts:any=[];
selectedShifts:any=[];
selectedShift: any=[];
selectedShift1: any=[];
dropdownSetting: any={};

regisform = new FormGroup({
  name: new FormControl(''),
  dob:new FormControl(''),
  mail:new FormControl(''),
  ph:new FormControl(''),
  states:new FormControl(''),
  gender: new FormControl(''),
  dpmid: new FormControl(''),
  password:new FormControl(''),
  shifts:new FormControl(''),
  sduration:new FormControl(''),
  doj:new FormControl(''),
  check:new FormControl('')
})
myDate = moment().format('YYYY-MM-DD')
//public today = new Date();

public dateOfBirth: IMyDpOptions = {
  dateFormat: 'yyyy.mm.dd',
  disableUntil: {year: 1980, month: 1, day: 1},
  disableSince: {year: 2000, month: 12, day: 31}
};
public dateOfJoining: IMyDpOptions = {
  dateFormat: 'yyyy.mm.dd',
  disableUntil: {year: 2002, month: 1, day: 1},
  disableSince: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
};

constructor(public fb: FormBuilder,private http:HttpClient,public service:AppService,private router:Router) { }

ngOnInit() {
  this.regisform= this.fb.group({
    name: ['',[Validators.required,Validators.minLength(5)]],
    dob: ['',[Validators.required]],
    mail: ['',[Validators.required,Validators.email]],
    ph:['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
    states: [{value:[],disabled: false},[Validators.required]],
    gender:['',[Validators.required]],
    dpmid: ['',[Validators.required,Validators.pattern("[0-8]{1}")]],
    password:['',[Validators.required,Validators.minLength(6)]],
    shifts:[{value:[this.selectedShifts],disabled: false},[Validators.required]],
    sduration:['',[Validators.required,Validators.pattern("[1-9]{1}")]],
    doj:['',[Validators.required]],
    check:['',[Validators.requiredTrue]],
  });
  
  this.regisform.patchValue({
    name:this.service.data.Name,
    mail:this.service.data. Email,
    ph:this.service.data.PhoneNumber,
    gender:this.service.data.Gender,
    dpmid:this.service.data.DepartmentId,
    password:this.service.data.password,
    sduration:this.service.data.shift_duration,
  })
  this.regisform.patchValue({
    dob:{
      jsdate:new Date(this.service.data.DateofBirth),
    },
    doj:{
      jsdate:new Date(this.service.data.DateofJoining),
    }
  })
  this.states=[
    {item_id:"1",item_text:'Andhra Pradesh'},
    {item_id:"2",item_text:'Delhi'},
    {item_id:"3",item_text:'Goa'},
    {item_id:"4",item_text:'Kerala'},
    {item_id:"5",item_text:'Madhya Pradesh'},
    {item_id:"6",item_text:'Karnataka'},
    {item_id:"7",item_text:'Maharashtra'},
    {item_id:"8",item_text:'Tamil Nadu'},
    {item_id:"9",item_text:'West Bengal'},
    {item_id:"10",item_text:'Orissa'},
  ]
  
  this.shifts=[
    {item_id:1,item_text:'A'},
    {item_id:2,item_text:'B'},
    {item_id:3,item_text:'C'},
    {item_id:4,item_text:'Off'},]
  
  this.array=this.service.data.State.split(',').map(function(val) {
    return parseInt(val, 10);
  });
  console.log(this.array.length);

  for(var i=0;i<this.array.length;i++)
  {
    for(var j=0;j<this.states.length;j++)
    {
      if(this.array[i]==this.states[j].item_id){

        this.selectedItems.push(this.states[j].item_text);
      }
    }
  }
  console.log(this.selectedItems);

  console.log(this.service.data.shift_order);

  this.array1=this.service.data.shift_order.split(',').map(function(val) {
    return val.toString();
  });
  console.log(this.array1)
  for(var j=0;j<this.array1.length;j++)
  {
  for(var k=0;k<this.shifts.length;k++){
  if(this.array1[j]===this.shifts[k].item_text){
  this.selectedShifts.push(this.shifts[k].item_text);
  
  }
  console.log(this.selectedShifts);
  }}
  


  this.dropdownSettings={
    singleSelection:false,
    idField:'item_id',
    textField:'item_text',
    selectAllText:'SelectAll',
    unSelectAllText:'UnSelectAll',
    itemsShowLimit:2,
    allowSearchFiter:this.ShowFilter
  };

  this.dropdownSetting={
    singleSelection:false,
    idField:'item_id',
    textField:'item_text',
    selectAllText:'SelectAll',
    unSelectAllText:'UnSelectAll',
    itemsShowLimit:4,
    allowSearchFiter:this.ShowFilter
  };
  console.log(this.selectedShift1.toString())
}

onItemSelect(item:any){
  this.n=-1;
  console.log('onItemSelect',item)
  this.selectedItem.push(item.item_id);
    console.log(this.selectedItem,this.selectedItems);
    
}

  onSelectAll(items:any){
    this.n=1;
    console.log('onSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedState.push(items[i].item_id);
    }
      console.log(this.selectedState);
  }

  onShiftSelect(item:any){
    this.n1=-1;
    console.log('onShiftSelect',item)
    this.selectedShift.push(item.item_text);
    console.log(this.selectedShift.toString());
      
  }
  
    onShiftSelectAll(items:any){
      this.n1=1;
      console.log('onShiftSelectAll',items)
      for(var i=0;i<items.length;i++){
      this.selectedShift1.push(items[i].item_text);
      }
        console.log(this.selectedShift1.toString());
    }

  save(data){
    data['dob']=moment(data.dob.formatted).format('YYYY-MM-DD');
    console.log(data.dob);
    data['doj']=moment(data.doj.formatted).format('YYYY-MM-DD');
    
    if(this.n==-1)
    data['states']=this.selectedItem.toString();
    else if(this.n==1)
    data['states']=this.selectedState.toString();
    else
    data['states']=this.service.data.State;
    console.log(data['states']);
    
    if(this.n1==-1)
    data['shifts']=this.selectedShift.toString();
    else if(this.n1==1)
    data['shifts']=this.selectedShift1.toString();
    else
    data['shifts']=this.service.data.shift_order;
    console.log(data['shifts']);

    this.bdate=data.dob[0]+data.dob[1]+data.dob[2]+data.dob[3]
    console.log(data.dob[0]);
    this.jdate=data.doj[0]+data.doj[1]+data.doj[2]+data.doj[3]
    console.log(Number(this.bdate),Number(this.jdate))
    this.b=Number(this.bdate)
    this.j=Number(this.jdate)
    console.log(this.b,this.j)
    if(this.j-this.b>=18)
    {
      this.router.navigate(["success"]);
      this.service.update(data,this.service.data.Id)
      .subscribe((res:Request)=>{
        this.arr=res;
        //console.log(this.arr);
      },
      error=>{console.error();
      })
    }
    else
    {
      alert("JoiningDate must be atleast 18 years greaterthan DateofBirth")
    }
    console.log(data)
    //this.regisform.reset();  
  //   this.http.post('http://localhost:5000/api/edit',)
  // .subscribe((res:Response)=>{
  //   },
  //   error=>{console.error();
  //   })
  //   //this.router.navigate(["success"]);
  // }
  }
  
}
