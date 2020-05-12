import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginRoutingModule } from './login.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginNavbarComponent } from './login-navbar/login-navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { LogComponent } from './log/log.component';
import { LogOrSignInComponent } from './log-or-sign-in/log-or-sign-in.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginNavbarComponent,
    WelcomeComponent,
    LogComponent,
    LogOrSignInComponent,
    
  ],

  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    SharedModule,
  ]
})
export class LoginModule { }
