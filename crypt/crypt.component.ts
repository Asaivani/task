import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-crypt',
  templateUrl: './crypt.component.html',
  styleUrls: ['./crypt.component.scss']
})
export class CryptComponent implements OnInit {
  cryptdata;
  constructor(private router:Router,private http:HttpClient,private form: FormBuilder) { }

  ngOnInit() {
    this.cryptdata = this.form.group({
      username: ['', [Validators.required] ]
   });
  }

  data:any="";
  data1:any="";
  edata:any=[];


  //   cryptdata= new FormGroup({
  //   username: new FormControl('')
  // })

  onencrypt(d)
   {
    if (d.length!=0)
    {
     //console.log(d)
    // this.http.get('http://localhost:5000/api/table')
    this.http.post('http://localhost:5001/api/encrypt',d,{
      responseType:"text",
    })
    .subscribe((res)=>{
       this.data=res;
       console.log(this.data);
     
        //this.router.navigate(['data']);
        this.edata=prompt('Encrypteddata',this.data);
        console.log(this.edata);
        
    },
    error=>{console.error();
    });
  }else{
    alert("Enter a text")
  } 
    
  }


  ondecrypt(ed){
    console.log(ed);
    // this.http.post('http://localhost:5001/api/details',ed)
    // .subscribe((res:Response)=>{
    //   ed=res;
    //   console.log(ed);
    //   },
    //   error=>{console.error();
    //   }) 
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


