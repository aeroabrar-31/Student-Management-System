import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  private baseUrl = "http://localhost:8080/student";


  constructor(private http: HttpClient) { }

  signup(signupdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, signupdata);
  }



}
