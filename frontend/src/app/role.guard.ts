import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem('token');

  let toast = inject(ToastrService);

  if (token === 'student.management.31@gmail.com')
    return true;

  toast.warning('Only Admins have access');


  return false;

};
