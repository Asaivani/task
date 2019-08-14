import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.scss']
})
export class AdddataComponent implements OnInit {
  tabledat:any;
  sel:any;
 imgsrc:any;
 imgurl:string="http://localhost:5001/"
 img;
  constructor(private http:HttpClient,public router : Router,public service:AppService) { }

  getlist(){
    // this.http.get('http://localhost:5000/api/table')
    this.http.get('http://localhost:5001/api/tab')
    .subscribe((res:Request)=>{
        this.tabledat=res;
        console.log(this.tabledat);
        this.sel=this.tabledat[0];
        console.log(this.sel);
        for(var i=0;i<this.sel.length;i++){
          console.log(this.sel[i].photo)
          if(this.sel[i].photo.length!=0){
         this.http.get(`http://localhost:5001/${this.sel[i].photo}`)
         .subscribe((res: Request) => {
           this.img=res;
           console.log(this.img,"hhhh")
         }, error => {
           console.log(error);
         });
       }
       else{
         this.sel[i].photo="pic1.png";
       }
        }
      },
    error=>{console.error();
    });
  }
  ngOnInit() {
    this.getlist();
  }

}
