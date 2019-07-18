import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-crypt',
  templateUrl: './crypt.component.html',
  styleUrls: ['./crypt.component.scss']
})
export class CryptComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
  }

  data:any;
  data1:any;
  edata:any=[];


    cryptdata= new FormGroup({
    username: new FormControl('')
  })



  onencrypt(d)
   {
     //console.log(d)
    // this.http.get('http://localhost:5000/api/table')
    this.http.post('http://localhost:5001/api/encrypt',d,{
      responseType:"text",
    })
    .subscribe((res)=>{
       this.data=res;
       //console.log(this.data);
     
        //this.router.navigate(['data']);
        this.edata=prompt('Encrypteddata',this.data);
        console.log(this.edata);
        
    },
    error=>{console.error();
    });  
  }


  ondecrypt(ed){
    console.log(ed);
    if (ed.length!=0)
    {
  // this.http.get('http://localhost:5000/api/table')
  this.http.post('http://localhost:5001/api/decrypt',ed,{
    responseType: 'text',
    
  })
   .subscribe((res)=>{
    this.data1=res;
    console.log(this.data1)
    prompt("Decrypted Data:",this.data1) 
  }, 
  error => {
    console.log(error);
  });
    }
    else{
      alert("encrypt the data")
    }

}

}
