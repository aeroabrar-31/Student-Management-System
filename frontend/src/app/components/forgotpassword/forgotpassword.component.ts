import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  constructor(private service: ForgotpasswordService, private snack: MatSnackBar, private router: Router) { }

  flag: boolean = false;
  otp: number = 1;

  checking = false;

  email = {
    email: ""
  }

  public spinner = false;



  check() {



    if (this.email.email == '') {
      this.snack.open("Fields can't be empty !", "OK");
      return;
    }



    this.spinner = true;

    setTimeout(() => {
      this.service.check(this.email).subscribe(
        response => {



          this.flag = true;

          // this.spinner = true;
          this.snack.open("Sending OTP...", "OK");

          this.service.sendOtp(this.email).subscribe(
            response => {

              this.spinner = false;
              this.snack.open("Otp Sent, please check email", "OK");
              this.router.navigateByUrl("/login/otpnewpassword");

            },
            error => {
              this.spinner = false;
            }
          )



        },

        error => {
          console.log(error);

          this.snack.open("User with email id doesn't exists !", "OK");
          this.spinner = false;
        }
      )


      // this.spinner = false;


      // this.otp = 2;
    }, 2000);



  }

}
