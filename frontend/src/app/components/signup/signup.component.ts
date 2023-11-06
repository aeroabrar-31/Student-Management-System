import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupserviceService } from 'src/app/services/signupservice.service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  public hide = true;
  public hide1 = true;

  public studentform: any = FormGroup;

  public progress = false;

  public confirmpassword = '';

  constructor(private snack: MatSnackBar,
    private service: SignupserviceService,
    private router: Router,
    private builder: FormBuilder,
    private toast: ToastrService) {

    this.studentform = this.builder.group({
      name: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.builder.control('', Validators.minLength(6)),
      confirm: this.builder.control('', Validators.minLength(6)),
      dob: this.builder.control('', Validators.required),
      branch: this.builder.control('', Validators.required),
      phone: this.builder.control(0, Validators.compose([Validators.required, Validators.minLength(10)])),
      year: this.builder.control(0, Validators.required),

      roll: this.builder.control('', Validators.required),

      gender: this.builder.control('', Validators.required)
    })

  }

  branches: string[] = [
    'CSE',
    'Civil',
    'Mech',
    'ECE',
    'EEE',
  ];

  years: number[] = [
    1, 2, 3, 4
  ];

  onFormSubmit() {

    // console.log(this.studentform.value.confirm);

    this.progress = true;

    if (this.studentform.valid) {
      console.log(this.studentform.value);

      setTimeout(() => {
        if (this.studentform.value.password == this.studentform.value.confirm) {
          this.service.signup(this.studentform.value).subscribe(
            response => {
              console.log(response);

              this.toast.success("Signed up successfully");

              this.router.navigate(['login']);

            },
            error => {
              console.log(error);

            }
          )
        }
        else {
          this.snack.open('Passwords are not matching !', 'OK');
        }
      }, 3000);



    }
    else {
      this.toast.error("Please enter correct credentials");
    }
  }
















}
