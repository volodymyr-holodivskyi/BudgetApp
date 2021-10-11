import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule
  ],
  exports:[
    HeaderComponent,
    DialogComponent
  ]
})
export class SharedModule { }
