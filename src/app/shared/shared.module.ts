import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alerts/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [AlertComponent,
    FooterComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [AlertComponent, 
    FooterComponent]
})
export class SharedModule { }
