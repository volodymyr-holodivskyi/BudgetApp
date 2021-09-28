import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    DialogComponent
  ]
})
export class SharedModule { }
