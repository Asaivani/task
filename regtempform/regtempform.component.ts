import { Component, OnInit } from '@angular/core';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:5001/api/file';

@Component({
  selector: 'app-regtempform',
  templateUrl: './regtempform.component.html',
  styleUrls: ['./regtempform.component.scss']
})
export class RegtempformComponent implements OnInit {
user:any={};
localImageUrl:any;
//fileToUpload: File = null;
public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


myDate = moment().format('YYYY-MM-DD')
private today = new Date();

public myDatePickerOptions1: IMyDpOptions = {
  dateFormat: 'yyyy.mm.dd',
  disableUntil: {year: 1994, month: 1, day: 1},
  disableSince: {year: 2000, month: 12, day: 31}
};

public myDatePickerOptions2: IMyDpOptions = {
  dateFormat: 'yyyy.mm.dd',
  disableSince: {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1}
};

constructor(private http:HttpClient,public logform : Router) {}
ngOnInit() {
this.uploader = new FileUploader({url: URL });
this.uploader.onAfterAddingFile = (fileItem) => {
    let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
    this.localImageUrl = url
    console.log(this.localImageUrl);
}
this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       //console.log('ImageUpload:uploaded:', item, status, response);
       alert('File uploaded successfully');
   };

}

onDateChanged(event: IMyDateModel){}

// handleFileInput(files: FileList) {
//   this.fileToUpload = files.item(0);
// }

onSubmit(f){
  f['dob']=moment(f.dob.formatted).format('YYYY-MM-DD');
  f['doj']=moment(f.doj.formatted).format('YYYY-MM-DD');
  console.log(f); 
  if(f['dob']<f['doj']){
    this.logform.navigate(["success"]);
  }
  else{
    alert("date of joining must be larger");
  }
}
}
  

