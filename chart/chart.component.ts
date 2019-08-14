import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
tabledata:any;
select:any;
chart:any;
a: number=0;
b:number=0; 
c: number=0;
d:number=0;
a1: number=0;
b1: number=0;
c1: number=0;
g:number=0;
m:number=0;
f:number=0;
male: any=[];
female: any=[];
  m1: any=[];
 
  getlist(){
    this.http.get('http://localhost:5001/api/table')
    .subscribe((res:Request)=>{
      this.tabledata=res;
      //console.log(this.tabledata);
      this.select=this.tabledata[0];
      console.log(this.select);
      for (var i = 0; i < this.select.length; i++) {
        //console.log(this.select[i].Gender);
        if(this.select[i].Gender==='male'){
          this.m=this.m+1;
          this.male.push(this.select[i].Name);
          //console.log(this.male);
          //console.log(this.select[i].Name);
          if((this.select[i].DateofJoining>"2002")&&(this.select[i].DateofJoining<"2006")){
            this.a=this.a+1;
           
            //console.log(this.a);
          }
          else if((this.select[i].DateofJoining>"2007")&&(this.select[i].DateofJoining<"2012")){
            this.b=this.b+1;
            this.m1.push(this.select[i].Name);
             console.log(this.m1);
          }
          else if((this.select[i].DateofJoining>"2013")&&(this.select[i].DateofJoining<"2017")){
            this.c=this.c+1;
            //console.log(this.c);
          }
          else if((this.select[i].DateofJoining>"2018")&&(this.select[i].DateofJoining<"2019")){
            this.d=this.d+1;
            //console.log(this.d);
          }
        }
        else if(this.select[i].Gender==='female'){
          this.f=this.f+1;
          this.female.push(this.select[i].Name);
          //console.log(this.female);
          //console.log(this.select[i].Name);
          if((this.select[i].DateofJoining>"2002")&&(this.select[i].DateofJoining<"2006")){
            this.a1=this.a1+1;
            //console.log(this.a1);
          }
          else if((this.select[i].DateofJoining>"2007")&&(this.select[i].DateofJoining<"2012")){
            this.b1=this.b1+1;
            //console.log(this.b1);
          }
          else if((this.select[i].DateofJoining>"2013")&&(this.select[i].DateofJoining<"2017")){
            this.c1=this.c1+1;
            //console.log(this.c1);
          }
          else if((this.select[i].DateofJoining>"2018")&&(this.select[i].DateofJoining<"2019")){
            this.g=this.g+1;
            //console.log(this.g);
          }
        }
        //console.log(this.select[i].DateofJoining);
      }
      
      this.chart = new Chart({
        chart:{
          //type:'line',
          type: 'column',
           //type:'bar',
          // plotBackgroundColor: null,
          // plotBorderWidth: null,
          // plotShadow: false,
          // type: 'pie'
        },
        title:{
          text: 'Employees'
        },
        xAxis:{
          type:"category",
          crosshair: true
        },
        yAxis:{
          min: 0,
          title:{
            text:'Values'
          }
        },
        plotOptions: {
          series:{
            events:{
              click: function (event) {
                //  alert(event.point.name + ':' +event.point.data)
                // console.log(event.point)
                alert(event.point.data) 
                // if(this.event.point.name==="2007-2012"){
                //   alert(this.m1)
                // }
              }.bind(this)
            },
            dataLabels:{
              enabled: true,
            }
          }
        },
        tooltip:{
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y}</b> of total<br/>'
        },
        series: [{
          colorByPoint: true,
          type:undefined,
          name: "Employees",
          data:[
            {
              name: "Male",
              y:this.m,
              data:[this.male],
              drilldown: "Male"
            },
            {
              name: "Female",
              y:this.f,
              data:[this.female],
              drilldown: "Female"
            },
            {
              name: "Total",
              y: this.select.length,
              data:[this.male,this.female],
              drilldown: "Total"
            },
          ],
        }],
        drilldown: {
          series: [{
            name: "Male",
            type:undefined,
            id: 'Male',
            data:[
              ['2002-2006', this.a],
              ['2007-2012', this.b],
              ['2013-2017', this.c],
              ['2018-2019', this.d],
            ]},
            {
              name: "Female",
              type:undefined,
              id: 'Female',
              data:[
                ['2002-2006', this.a1],
                ['2007-2012', this.b1],
                ['2013-2017', this.c1],
                ['2018-2019', this.g],
              ]
            },
              {
                name: "Total",
                type:undefined,
                id: 'Total',
                data: [
                  ['2002-2006', this.a+this.a1],
                  ['2007-2012', this.b+this.b1],
                  ['2013-2017', this.c+this.c1],
                  ['2018-2019', this.d+this.g],
                ]
              }]}
            });
          },
          error=>{console.error();
          });
        }
  // // add point to chart serie
  // add() {
  //   this.chart.addPoint(Math.floor(Math.random() * 10));
  // }
constructor(private http:HttpClient,public router : Router) { }
ngOnInit() {
    this.getlist();
  }
}


