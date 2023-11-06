import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  private baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  check(email: any) {
    return this.http.get(this.baseUrl + 'student/getbyemail/' + email.email);
  }

  sendOtp(email: any) {
    return this.http.get(this.baseUrl + 'email/sendotp/' + email.email);
  }
}
