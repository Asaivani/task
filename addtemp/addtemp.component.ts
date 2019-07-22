import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addtemp',
  templateUrl: './addtemp.component.html',
  styleUrls: ['./addtemp.component.scss']
})
export class AddtempComponent implements OnInit {
  id: number;
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
        id: Date.now(),
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
  

