import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  studentform: any = FormGroup;

  constructor(private formgroup: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService,
    private service: DashboardService,
    private snack: MatSnackBar) {

    console.log(data);

    this.studentform = this.formgroup.group({

      name: this.formgroup.control('', Validators.required),
      email: this.formgroup.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.formgroup.control('', Validators.minLength(6)),
      dob: this.formgroup.control('', Validators.required),
      branch: this.formgroup.control('', Validators.required),
      phone: this.formgroup.control(0, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      year: this.formgroup.control('', Validators.required),

      roll: this.formgroup.control('', Validators.required),

      gender: this.formgroup.control('', Validators.required)
    })
  }

  temp: any;

  ngOnInit() {
    console.log(this.data);

    this.studentform.patchValue(this.data);

    this.temp = this.studentform;

  }





  branches: string[] = [
    'CSE',
    'Civil',
    'Mech',
    'ECE',
    'EEE',
  ];

  years: string[] = [
    '1', '2', '3', '4'
  ]

  hide = true;


  onFormSubmit() {
    if (this.studentform.valid) {

      if (this.data) {
        //edit
        console.log(this.studentform.value);

        if (localStorage.getItem('token') != 'student.management.31@gmail.com') {
          localStorage.removeItem('token');
          localStorage.setItem('token', this.studentform.value.email);
        }

        this.service.updateStudent(this.data.id, this.studentform.value).subscribe(
          response => {

            window.location.reload();

            // this.toast.success('Updated successfully');
            this.snack.open('Updated Successfully', 'OK');
          },
          error => {
            this.toast.error('76');
          }
        )

      }
      else {
        //add
        this.service.addUser(this.studentform.value).subscribe(

          response => {
            this.toast.success('Student added successfully !');
            window.location.reload();
          },
          error => {
            this.toast.error(error);
          }

        )
      }
    }
    else {
      this.toast.error('Form is invalid');
    }
  }

}
