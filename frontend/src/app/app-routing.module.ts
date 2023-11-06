import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './components/email/email.component';
import { HomeComponent } from './components/home/home.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { OtpnewpasswordComponent } from './components/otpnewpassword/otpnewpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { roleGuard } from './role.guard';

import { Router } from '@angular/router';

const routes: Routes = [

  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "sendemail",
    component: EmailComponent,
    pathMatch: "full",
    canActivate: [authGuard]
  },

  {
    path: "login/signup",
    component: SignupComponent,
    pathMatch: "full"
  },

  {
    path: "login",
    component: LoginpageComponent,
    pathMatch: "full"
  },
  {
    path: "login/forgotpassword",
    component: ForgotpasswordComponent,
    pathMatch: "full"
  },

  {
    path: "login/otpnewpassword",
    component: OtpnewpasswordComponent,
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [authGuard, roleGuard]
  },

  {
    path: "profile",
    component: ProfileComponent,
    pathMatch: "full",
    canActivate: [authGuard]
  },
  {
    path: "**",
    redirectTo: "/home"
    // pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
