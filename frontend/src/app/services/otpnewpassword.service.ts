import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpnewpasswordService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  validate(data: any) {
    return this.http.post(`${this.baseUrl}/email/validate`, data);
  }

}
