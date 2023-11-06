import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/users';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public mod = 2;

  constructor(private service: ProfileService,
    private serv: DashboardService,
    private toast: ToastrService,
    private dialog: MatDialog) {
    this.mod = 2;

  }
  // public email: string;

  images: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    // 'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar8.png',
    'https://bootdey.com/img/Content/avatar/avatar9.png',
  ];


  public hide = true;


  public isAdmin = false;

  ngOnInit() {
    let t = localStorage.getItem('token');
    console.log(t);

    if (t != null)
      this.service.getuser(t).subscribe(
        data => {
          console.log(data);
          this.mod = this.user.id % 10;

          this.user = data;
        }
      )

    if (localStorage.getItem('token') === 'student.management.31@gmail.com') {
      this.isAdmin = true;
    }



  }

  updateStudent() {
    console.log(this.user.id);

    this.dialog.open(DialogComponent, {
      data: this.user
    })
  }


  public onOpenModal(user: UserInterface, mode: string): void {

    console.log(user);

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    console.log(container);

    if (container != null) {
      console.log(this.editUser);
      container.appendChild(button);
    }



    button.click();
  }

  public onUpdateEmployee(user: UserInterface): void {


    // this.ngOnInit();

    window.location.reload();
  }

  public users: UserInterface[] = [];








  public editUser: UserInterface = {
    id: 0,
    email: '',
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    roll: '',
    branch: '',
    year: ''
  };



  public user: UserInterface = {
    id: 0,
    email: '',
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    roll: '',
    branch: '',
    year: ''
  };

}
