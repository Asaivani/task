import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.scss']
})
export class AddformComponent implements OnInit {
  addForm : FormGroup;
  forms:FormArray;

  constructor(private fb: FormBuilder) {}

  createItem(): FormGroup {
    return this.fb.group({
      fullname: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
    
    
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      forms: this.fb.array([ this.createItem() ])
    });
    
  }

  add():void{ 
    this.forms = this.addForm.get('forms') as FormArray;
    this.forms.push(this.createItem());
  }
  delete(i){
    this.forms.removeAt(i);
  }
  // save(){
  //   console.log(this.forms);
  // }
}
