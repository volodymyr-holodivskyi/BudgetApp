import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:NotFoundComponent}])
  ]
})
export class NotFoundModule { }
