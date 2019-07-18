import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.scss']
})
export class EmpdetailsComponent implements OnInit {
  

  ta1:any;
  empd:any;

  constructor(private http:HttpClient,public router : Router,public service:AppService) { }

  // list(){
  //   // this.http.get('http://localhost:5000/api/table')
  //   this.http.get('http://localhost:5001/api/etable')
  //   .subscribe((res:Response)=>{
  //       this.ta=res;
  //       console.log(this.ta);
  //       this.empdata=this.ta[0];
  //     },
  //   error=>{console.error();
  //   });
  // }

  alist(){
    // this.http.get('http://localhost:5000/api/table')
    this.http.get('http://localhost:5001/api/emptable')
    .subscribe((res:Response)=>{
        this.ta1=res;
        console.log(this.ta1);
        this.empd=this.ta1[0];
      },
    error=>{console.error();
    });
  }



  ngOnInit() {
    // this.list();
    this.alist();
  }

}
