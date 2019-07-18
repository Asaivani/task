import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
 

  constructor(private http:HttpClient,public router : Router,public service:AppService) { }

getlist(){
  // this.http.get('http://localhost:5000/api/table')
  this.http.get('http://localhost:5001/api/table')
  .subscribe((res:Response)=>{
      this.tabledata=res;
      this.select=this.tabledata[0];
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


  

  ngOnInit() {
    this.getlist();
  }

  
}
