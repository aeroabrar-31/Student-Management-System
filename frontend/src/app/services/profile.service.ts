import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getuser(email: string): Observable<UserInterface> {
    return this.http.get<UserInterface>('http://localhost:8080/student/getbyemail/' + email);
  }
  // getUserById(id: number): Observable<UserInterface> {
  //   return this.http.get<UserInterface>(this.url + '/' + id);
  // }
}
