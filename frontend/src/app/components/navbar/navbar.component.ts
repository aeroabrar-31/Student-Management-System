import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public flag = true;

  logoutflag = false;

  // constructor(private btn:Mat){}


  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.logoutflag = false;
    }
    else {
      this.logoutflag = true;
      // window.location.reload();
    }

  }

  loggedIn() {
    if (localStorage.getItem('token') == null) {
      return true;
    }
    return false;
  }





  constructor(private route: Router, private toast: ToastrService) {
    console.log('constructoor');
    // location.reload();
    // const theme = new MatButtonTheme();
    // theme.primary = 'red';
    // this.btn.theme = theme;

  }

  dashboard() {
    this.route.navigate(['dashboard']);
  }

  home() {
    this.route.navigate(['']);
  }

  login() {
    this.route.navigateByUrl('login')
  }

  signup() {
    this.route.navigateByUrl('login/signup')
  }


  logout() {
    console.log("Logout");
    // console.log(this.flag);


    localStorage.removeItem('token');

    // environment.logoutflag = false;

    this.route.navigate(['login']);

    // this.toast.warning('Logged Out')



    window.location.reload();

  }

  profile() {
    this.route.navigate(['profile']);
  }
  emailbomber() {
    this.route.navigate(['sendemail']);
  }

}
