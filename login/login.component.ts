import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
//import * as _ from 'underscore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }
  ngOnInit() {
  }
  //title = 'practice';
  //userdata:any=[{username:'saivani' ,password:'1234'},{username:'sowmya' ,password:'sowmy@123'}];
  //a:any;
  //i:number;
  data:any;
  edata:any=[];

    loginForm = new FormGroup({
    username: new FormControl(''),
    password:new FormControl('')
  })
  onSubmit(d)
   {
     //console.log(d)
    // this.http.get('http://localhost:5000/api/table')
    this.http.post('http://localhost:5001/api/login',d,{responseType:"text"})
    .subscribe((res)=>{
       this.data=res;
       //console.log(this.data);
      if(this.data!='failure')
      {
        this.router.navigate(['data']);
      }
      else
      {
        this.router.navigate(['signup']);
      }   
    },
    error=>{console.error();
    });  
  }

  
}

     //let b:number;
      // for(var i=0;i<this.data[0].length;i++)
      //   {
      //     if((this.loginForm.value.username==this.data[0][i].Name )&&(this.loginForm.value.password==this.data[0][i].password))
      //     {
      //       b=1;
      //     }
      //   }
      // if(b==1)
      // {
      //   this.router.navigate(['data']);
      //   //console.log(this.data);

      // }
      // else{
      //   this.router.navigate(['signup']);
      // }
  
// onSubmit(f)
// {
//   //console.log(this.loginForm.value.username);
//   //console.log(this.loginForm.value.password);
//   for(this.i=0;this.i<this.userdata.length;this.i++)
//   {
//     this.a=0;
//     if((this.loginForm.value.username==this.userdata[this.i].username )&&(this.loginForm.value.password==this.userdata[this.i].password))
//     {
//       this.a=1;
//       break; 
//     }
//   }
//   //console.log(this.a);
//   if(this.a==1)
//   {
//     this.router.navigate(['regform']);
//   }
//   else
//   {
//     alert("not successful");
//   }
//   f.reset();  
// }
// }




    
    



