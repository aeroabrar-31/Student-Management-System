import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailserviceService } from 'src/app/services/emailservice.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  data = {
    subject: '',
    body: ''
  }

  public flag = false;

  public isAdmin = false;

  constructor(private email: EmailserviceService, private snack: MatSnackBar) {

    if (localStorage.getItem('token') == 'student.management.31@gmail.com') {
      this.isAdmin = true;
    }

  }

  ngOnInit(): void {


  }



  doSubmitForm(bool: any) {

    console.log(bool);


    if (this.data.subject.length == 0 || this.data.body.length == 0) {
      this.snack.open("Fields can't be empty !", "OK");
      return;
    }

    this.flag = true;


    console.log("Form submitted !");

    console.log(this.data);

    if (this.isAdmin) {

      this.email.sendEmailToAll(this.data).subscribe(
        response => {
          console.log(response);
          this.flag = false;
          this.snack.open("Email Successfully sent !", "OK");
        },

        error => {
          console.log(error);
          this.flag = false;
          this.snack.open("Email Address can't found !", "Retry");
        }


      )
    }
    else {
      let email = localStorage.getItem('token');
      let admindata = {
        'from': email,
        'subject': this.data.subject,
        'body': this.data.body
      }
      this.email.sendEmailToAdmin(admindata).subscribe(
        response => {
          console.log(response);
          this.flag = false;
          this.snack.open("Email Successfully sent !", "OK");
        },

        error => {
          console.log(error);
          this.flag = false;
          this.snack.open("Email Address can't found !", "Retry");
        }


      )
    }

    // console.log("flag : " + this.flag);




  }

}
