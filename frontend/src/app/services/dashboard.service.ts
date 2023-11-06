import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'http://localhost:8080/student';

  updateStudent(id: number, student: any): Observable<any> {

    console.log(student);

    return this.http.put<any>(this.url + '/edit/' + id, student);
  }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/add', data);
  }



  constructor(private http: HttpClient) { }




  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.url + '/getall');
  }

  deleteUser(id: number) {
    // t=id;
    return this.http.delete(this.url + '/delete/' + id);
  }

  getUserById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.url + '/' + id);
  }

  editUser(id: number) {

  }


}
