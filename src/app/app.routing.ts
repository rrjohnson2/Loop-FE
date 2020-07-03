import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes =[
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'layout', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '', redirectTo:'layout', pathMatch:"prefix"}
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
  providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap:[AppComponent]
})
export class AppRoutingModule { }
