import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AppService } from '../app.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:5001/api/files';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.scss']
})
export class AddformComponent implements OnInit {
  addForm : FormGroup;
  forms:FormArray;
  localImageUrl:any;

  constructor(private fb: FormBuilder,private http:HttpClient,public router : Router,public service:AppService) {}
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  createItem(): FormGroup {
    return this.fb.group({
      fullname: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      ph:['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
      file:[''],
    }); 
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      forms: this.fb.array([ this.createItem() ])
    });


    this.uploader = new FileUploader({url: URL});
    this.uploader.onBuildItemForm = (fileItem: any) => {
      let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.localImageUrl = url;
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      //alert('File uploaded successfully');
    };
    
  }

  add():void{ 
    this.forms = this.addForm.get('forms') as FormArray;
    this.forms.push(this.createItem());
  }
  delete(i){
    this.forms.removeAt(i);
  }
   save(data){
     console.log(data.forms.length)
     for(var i=0;i<data.forms.length;i++){
       console.log(data.forms[i].file);
       data.forms[i].file=data.forms[i].file.substring(data.forms[i].file.indexOf("fakepath") + 9, data.forms[i].file.length);
      
      console.log(data.forms[i]);
     this.http.post('http://localhost:5001/api/otherdata',data.forms[i])
    .subscribe((res:Request)=>{
      data=res;
      console.log(data);
    },
    error=>{console.error();
    })
  }
}
}
