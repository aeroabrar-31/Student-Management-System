import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {

  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  sendEmailToAll(data: any) {
    return this.http.post(`${this.baseUrl}/email/sendtoall`, data);
  }
  sendEmailToAdmin(data: any) {
    return this.http.post(`${this.baseUrl}/email/sendtoadmin`, data);
  }


}
