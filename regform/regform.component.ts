import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators,FormArray} from '@angular/forms' ;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import { AppService } from '../app.service';
import * as moment from 'moment';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';


import { Url } from 'url';
const URL = 'http://localhost:5001/api/file';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.scss']
})
export class RegformComponent implements OnInit {
  // forms:FormArray;

  dat:any=[];
  time:any;
  localImageUrl:any;
  username:any;
  bdate: any;
  jdate: any;
  b: number;
  j: number;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  disabled=false;
  ShowFilter=false;
  limitSelection=false;
  states:any=[];
  selectedItems:any=[];
  selectedShifts: any=[];
  selectedShift: any=[];
  dropdownSettings:any={};
  dropdownSetting:any={};
  selectedState:any=[];
  n:any=0;

  shifts:any=[];

  myDate = moment().format('YYYY-MM-DD')
  private to = new Date();
  
  public dateOfBirth: IMyDpOptions = {
    dateFormat: 'yyyy.mm.dd',
     disableUntil: {year: 1980, month: 1, day: 1},
    disableSince: {year: 2000, month: 12, day: 31}
    //disableSince: {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1}
};

public dateOfJoining: IMyDpOptions = {
  dateFormat: 'yyyy.mm.dd',
  disableUntil: {year: 2002, month: 1, day: 1},
  disableSince: {year: this.to.getFullYear(), month: this.to.getMonth() + 1, day: this.to.getDate() + 1}
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
  mail:new FormControl(''),
  ph:new FormControl(''),
  state:new FormControl(''),
  gender: new FormControl(''),
  dpmid:new FormControl(''),
  password:new FormControl(''),
  doj:new FormControl(''),
  file:new FormControl(''),
  shifts:new FormControl(''),
  sduration:new FormControl(''),
  check:new FormControl('')
})
  
constructor(public fb: FormBuilder,private http:HttpClient,public logform : Router,public service:AppService) { }
  
// createItem(): FormGroup {
//     return this.fb.group({
//       file:[''],
//     }); 
//   }

  ngOnInit() {
    this.regisform= this.fb.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      dob: ['',[Validators.required]],
      mail: ['',[Validators.required,Validators.email]],
      ph:['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
      states: [this.selectedState],
      gender:['',[Validators.required]],
      dpmid: ['',[Validators.required,Validators.pattern("[0-8]{1}")]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]],
      doj:['',[Validators.required]],
      file:[''],
      shifts:['',[Validators.required]],
      sduration:['',[Validators.required,Validators.pattern("[1-9]{1}")]],
      check:['',[Validators.requiredTrue]],
      // forms: this.fb.array([ this.createItem() ])
  
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
      selectAllText:'SelectAll',
      unSelectAllText:'UnSelectAll',
      itemsShowLimit:2,
      allowSearchFiter:this.ShowFilter
    };

    this.shifts=[
      {item_id:1,item_text:'A'},
      {item_id:2,item_text:'B'},
      {item_id:3,item_text:'C'},
      {item_id:4,item_text:'Off'},]

      this.dropdownSetting={
        singleSelection:false,
        idField:'item_id',
        textField:'item_text',
        selectAllText:'SelectAll',
        unSelectAllText:'UnSelectAll',
        itemsShowLimit:4,
        allowSearchFiter:this.ShowFilter
      };

this.uploader = new FileUploader({url: URL});
// this.uploader.onAfterAddingFile = (fileItem) => {
//     let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
//     this.localImageUrl = url;
//     //console.log(this.localImageUrl);
// }
this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
  let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
  this.localImageUrl = url;
  form.append('Name' , this.regisform.value.name);
 };
this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       console.log('ImageUpload:uploaded:', item, status, response);
       //this.service.path=response;
       alert('File uploaded successfully');
   };
  //  let optns = this.uploader.options;
  // optns = {
  //   ...optns,
  //   additionalParameter: { Name: this.service.data.name }
  // };
  // this.uploader.setOptions(optns);
  // }
  }

  // uploadAll():void{ 
  //   this.forms = this.regisform.get('forms') as FormArray;
  //   this.forms.push(this.createItem());
  // }

  onItemSelect(item:any){
    console.log('onItemSelect',item)
    this.selectedItems.push(item.item_id);
      console.log(this.selectedItems.toString());
  }
  onSelectAll(items:any){
    this.n=1;
    console.log('onSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedState.push(items[i].item_id);
    }
      console.log(this.selectedState.toString());
  }

  onShiftSelect(item:any){
    console.log('onShiftSelect',item)
    this.selectedShifts.push(item.item_text);
      console.log(this.selectedShifts.toString());
  }
  onShiftSelectAll(items:any){
    this.n=1;
    console.log('onShiftSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedShift.push(items[i].item_text);
    }
      console.log(this.selectedShift.toString());
  }
  
onsubmit(f){
f.file=this.service.path;
console.log(f.file);
f['dob']=moment(f.dob.formatted).format('YYYY-MM-DD');
f['doj']=moment(f.doj.formatted).format('YYYY-MM-DD');
// this.http.post('http://localhost:5000/api/details',f)

if(this.n==0)
f['states']=this.selectedItems.toString();
else if(this.n==1)
f['states']=this.selectedState.toString();

if(this.n==0)
f['shifts']=this.selectedShifts.toString();
else if(this.n==1)
f['shifts']=this.selectedShift.toString();

this.bdate=f.dob[0]+f.dob[1]+f.dob[2]+f.dob[3]
this.jdate=f.doj[0]+f.doj[1]+f.doj[2]+f.doj[3]
console.log(Number(this.bdate),Number(this.jdate))
this.b=Number(this.bdate)
this.j=Number(this.jdate)
console.log(this.b,this.j)
if(this.j-this.b>=18)
{
  this.logform.navigate(["success"]);
  this.http.post('http://localhost:5001/api/details',f)
  .subscribe((res:Response)=>{
    f=res;
    console.log(f);
  },
  error=>{console.error();
  })
}
else
{
  alert("JoiningDate must be atleast 18 years greaterthan DateofBirth")
}
console.log(f)
//this.regisform.reset();
      // this.selectedItems= _.pluck(this.states,'item_id');
      // console.log(this.selectedItems);
}
}







