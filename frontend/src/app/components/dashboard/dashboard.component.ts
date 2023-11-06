import { Component, Input, Output, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserInterface } from 'src/app/users';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditserviceService } from 'src/app/editservice.service';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  public users: UserInterface[] = [];

  constructor(private toast: ToastrService,
    private service: DashboardService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private route: Router,
    private editservice: EditserviceService) {

    console.log(31);

    this.getAll();

    // this.users.
    console.log(36);






  }

  images: string[] = [
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    // 'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    // 'https://bootdey.com/img/Content/avatar/avatar3.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',



  ];







  dialogopen(user: UserInterface) {

    console.log(user);


    this.toast.info('Dialog opened successfully');
    this.dialog.open(DialogComponent, {
      data: user
    });
  }

  ngOnInit() {

  }

  addNew() {
    this.dialog.open(DialogComponent);
  }



  public len = 0;

  getAll() {
    this.service.getAllUsers().subscribe(
      data => {
        this.users = data;

        let ind = 0;

        this.users.sort();

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].email == 'student.management.31@gmail.com') {
            ind = i;
            break;
          }
        }

        console.log(this.users[ind]);
        this.users.splice(ind, 1);
        console.log(this.users);







      }
    );
  }


  delete(id: number) {
    console.log("in delete()" + id);
    // alert("Are you sure ?");

    const f = confirm("Are you sure to delete ?");



    // this.conf = this.dialogservice.receive();
    // console.log("In the dashboard " + this.conf);


    if (f) {
      this.service.deleteUser(id).subscribe(
        response => {
          console.log(response);

          window.location.reload();
          this.snack.open("Deleted user", "OK");
        }
      )
    }

  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: UserInterface[] = [];


    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.gender.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.roll.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.branch.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.year.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (!key) {
      this.getAll();
    }
  }






  // public onOpenModal(user: UserInterface, mode: string): void {

  //   console.log(user);

  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');

  //   if (mode === 'edit') {
  //     this.editUser = user;
  //     button.setAttribute('data-target', '#updateEmployeeModal');
  //   }

  //   console.log(container);

  //   if (container != null) {
  //     console.log(this.editUser);
  //     container.appendChild(button);
  //   }



  //   button.click();
  // }

  // public onUpdateEmployee(user: UserInterface): void {

  //   user.id = this.editUser.id;

  //   this.service.updateEmployee(user.id, user).subscribe(
  //     response => {
  //       console.log(response);
  //       this.toast.success('User updated Successfully');
  //       this.getAll();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }






  // public editUser: UserInterface = {
  //   id: 0,
  //   email: '',
  //   name: '',
  //   dob: '',
  //   gender: '',
  //   phone: '',
  //   password: ''
  // };



  // public getUser = {
  //   id: 0,
  //   name: '',
  //   phone: '',
  //   password: '',
  //   gender: '',
  //   email: '',
  //   dob: ''

  // }

  // sendingdata: UserInterface = {
  //   id: 0,
  //   email: '',
  //   name: '',
  //   dob: '',
  //   gender: '',
  //   phone: '',
  //   password: ''
  // };







  // private conf = '';

  // public temp = new EdituserComponent(new EditserviceService());

  // public images: string[] = [];







  // edit(id: number) {


  //   // console.log("In edit()");
  //   // this.service.getUserById(id).subscribe(
  //   //   data => {
  //   //     console.log(data);

  //   //     this.getUser.id = data.id;
  //   //     this.getUser.dob = data.dob;
  //   //     this.getUser.email = data.email;
  //   //     this.getUser.name = data.name;
  //   //     this.getUser.gender = data.gender;
  //   //     this.getUser.phone = data.phone;
  //   //     this.getUser.password = data.password;



  //   //   }
  //   // );

  //   // // console.log(iser);

  //   // this.temp.ngOnInit(this.getUser);

  //   // this.route.navigate(["edituser"]);



  // }




}
