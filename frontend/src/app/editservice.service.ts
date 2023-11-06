import { Injectable, OnInit } from '@angular/core';

// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EditserviceService {

  constructor() { }

  public editdata = {
    id: 0,
    name: '',
    phone: '',
    password: '',
    gender: '',
    email: '',
    dob: ''

  }




}
