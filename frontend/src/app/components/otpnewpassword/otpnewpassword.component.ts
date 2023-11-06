import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OtpnewpasswordService } from '../../services/otpnewpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otpnewpassword',
  templateUrl: './otpnewpassword.component.html',
  styleUrls: ['./otpnewpassword.component.css']
})
export class OtpnewpasswordComponent {

  constructor(private snack: MatSnackBar, private service: OtpnewpasswordService, private router: Router) { }

  hide1 = true;
  hide2 = true;
  validate = false;
  data = {
    otp: '',
    pass: '',
    confirm: ''

  }

  otppassword = {
    otp: '',
    newpassword: ''
  }

  check() {

    if (this.data.otp == '' || this.data.pass == '' || this.data.confirm == '') {
      this.snack.open("Fields can't be empty !", "Ok");
      return;
    }

    this.validate = true;

    setTimeout(() => {
      if (this.data.otp.length != 6) {
        this.snack.open("Otp length should be 6", "OK");
        this.validate = false;
        return;
      }

      if (this.data.pass != this.data.confirm) {
        this.snack.open("Passwords are not matching !", "Ok");
        this.validate = false;
        return;
      }

      this.otppassword.otp = this.data.otp;
      this.otppassword.newpassword = this.data.pass;

      console.log(this.otppassword);


      this.service.validate(this.otppassword).subscribe(

        response => {
          this.validate = false;
          this.snack.open("Suceessfully updated !!", "Ok");

          console.log(response);


          this.router.navigateByUrl("/login");

        },

        error => {
          console.log(error);
          this.validate = false;
          this.snack.open("Incorrect OTP", "Ok");

        }



      )
    }, 3000);




  }

}
