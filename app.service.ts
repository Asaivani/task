import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
data;
  constructor(public http : HttpClient) { }

  update(data,id):Observable<any>{
    //console.log(data);
    
    // return this.http.post(`http://localhost:5000/api/edit/${id}`,data)
       return this.http.post(`http://localhost:5001/api/edit/${id}`,data)
  }
}
