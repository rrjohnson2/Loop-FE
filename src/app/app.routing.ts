import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes =[
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'profile', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', redirectTo:'profile', pathMatch:"prefix"}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
