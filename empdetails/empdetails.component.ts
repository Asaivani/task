import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.scss']
})
export class EmpdetailsComponent implements OnInit {
  

  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'mytable',
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  };
  

  ta1:any;
  empd:any;

  constructor(private http:HttpClient,public router : Router,public service:AppService, private exportAsService: ExportAsService) { }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'myFile').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }

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
