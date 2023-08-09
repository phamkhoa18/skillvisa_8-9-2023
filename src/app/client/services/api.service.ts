import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL : any = 'https://api.skillvisa.edu.vn'
  constructor(private http : HttpClient) { }


  async post(path: any, body: any) {
    return await this.http.post(`${this.URL}${path}`,body );
  }

  async get(path : any) {
    return await this.http.get(`${this.URL}${path}`);
  }
}
