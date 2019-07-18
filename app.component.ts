import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  //title = 'practice';
  
  constructor(public first : Router){}
  ngOnInit(){
    
     this.first.navigate(["login"]);
    //this.first.navigate(["regform"]);
  }
//  login(){
//  this.first.navigate(["login"]);
//  }
}