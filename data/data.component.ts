import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup,FormControl,FormBuilder,Validators,FormArray} from '@angular/forms' ;
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
 tabledata:any;
 select:any;
 arr:any=[];
imgsrc:any;
imgurl:string="http://localhost:5001/"
img;
d1:any;
s1:any;
en:boolean;
//myform;

  constructor(private http:HttpClient,public router : Router,public service:AppService) { }

getlist(){
  this.en=true;
  // this.http.get('http://localhost:5000/api/table')
  this.http.get('http://localhost:5001/api/table')
  .subscribe((res:Request)=>{
      this.tabledata=res;
      this.select=this.tabledata[0];
      console.log(this.select);

      for (var i = 0; i < this.select.length; i++) {
        this.select[i].shift_order = this.select[i].shift_order.split(',')
        console.log(this.select[i].shift_order);
        var rep=this.select[i].shift_duration;
        var arr=[];
        this.select[i].shift_order.forEach(function(words){
          console.log(words)
          if(words=="Off"){
          arr.push(words)
          }
          else{
            arr.push(words.repeat(rep))
          }
        });
        console.log(arr)
        this.select[i].shift_order = arr.toString()
        if(this.select[i].photo.length!=0){
       this.http.get(`http://localhost:5001/${this.select[i].photo}`)
       .subscribe((res: Request) => {
         this.img=res;
         console.log(this.img,"hhhh")
       }, error => {
         console.log(error);
       });
     }
     else{
       this.select[i].photo="pic1.png";
     }
      }
    },
  error=>{console.error();
  });
}

add(){
  this.router.navigate(["regform"]);
}

edit(data){
  this.service.data=data;
  this.router.navigate(["editform"]);
  
}

del(id){
  // this.http.post('http://localhost:5000/api/delete',id)
  this.http.post('http://localhost:5001/api/delete',id)
    .subscribe(data=>{
     this.getlist();
    },
  error=>{console.error();
  });
}
arr1:any=[];

search(d){
  console.log(d)
  this.http.get('http://localhost:5001/api/table')
  .subscribe((res:Request)=>{
      this.d1=res;
      this.s1=this.d1[0];
      for (var i = 0; i < this.s1.length; i++)
       {
        if(this.s1[i].Name==d){
          console.log(this.s1[i]);
          this.arr1.push(this.s1[i]);
          console.log(this.arr1);
        }
       }
       this.select=[];
       
  });
  
}
// d:string;
// search:object[]=this.movies;
// add()
// {
//   if(this.d==""){
//     this.search=this.movies;
//   }
//   else{
//     this.search=this.movies.filter((movie)=>{
//       return movie.title.includes(this.d)==true;
//   })
// }
// }

  ngOnInit() {
    this.getlist();

  }
  
}
