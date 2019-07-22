import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addtemp',
  templateUrl: './addtemp.component.html',
  styleUrls: ['./addtemp.component.scss']
})
export class AddtempComponent implements OnInit {

  firstName:String;
  email:String;
  password:string;

  public form: {
    items;
  };
    constructor() { 
  
      this.form = {
        items: []
    };
    this.additem();
    }
  
    ngOnInit() {
      console.log(this.form.items)
    }
    additem(){
      this.form.items.push({
        
        firstName: "",
        email: "",
        password: "",
    });
    }
    delete(i){
      this.form.items.splice( i, 1) ;
    }
    save(d){
      console.log(d);
    }
  }
  

