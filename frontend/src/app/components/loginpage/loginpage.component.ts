import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';

import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { environment } from 'src/environments/environment.development';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {

  hide = true;

  ngOnInit() {
    console.log("In the login componenet ");

  }

  public progress: boolean = false;

  loginform: FormGroup;

  constructor(private service: LoginserviceService,
    private snack: MatSnackBar, private router: Router, private toast: ToastrService,
    private builder: FormBuilder) {
    this.loginform = builder.group({

      email: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    }

    )
  }

  isValid = false;


  loginsubmit() {
    console.log("login Form submitted !");

    this.progress = true;


    setTimeout(() => {
      if (this.loginform.valid) {
        this.service.login(this.loginform.value).subscribe(
          response => {
            this.toast.success("Logged in Successfully");

            let em = this.loginform.value.email;
            localStorage.setItem('token', em);
            // window.location.reload();
            this.progress = false;
            this.router.navigate(['profile']);

          },
          error => {
            this.toast.error("Invalid credentials !");
            this.progress = false;
          }
        )
      }
      else {
        this.progress = false;
        this.toast.error("Fields can't be empty");
      }

    }, 3000);



    console.log('In the end');




  }

}
