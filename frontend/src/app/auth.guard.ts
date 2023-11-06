import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './services/dashboard.service';


export const authGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem('token');

  // sleepyWork();

  let rt = inject(Router);
  let toast = inject(ToastrService);

  let service = inject(DashboardService);

  let users = service.getAllUsers();

  let flag = false;
  console.log(token);


  // console.log(users);

  // function fun() {
  //   users.subscribe(
  //     data => {
  //       console.log(data);

  //       for (let i = 0; i < data.length; i++) {

  //         console.log(data[i].email);
  //         if (data[i].email === token) {

  //           console.log(37);

  //           flag = true;
  //           return true;
  //           // break;
  //         }
  //       }
  //     }
  //   )
  // }




  // fun();

  // console.log('in the else');




  console.log(64);

  if (token != null) {
    return true;
  }
  else {
    rt.navigate(['login']);
    toast.warning("Please login", '', {
      progressBar: true,
      progressAnimation: 'decreasing',
      easing: 'ease-in',
      easeTime: 500,
      timeOut: 2000,
    });
    return false;
  }











};







function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}



