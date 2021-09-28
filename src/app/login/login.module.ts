import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastContainerDirective, ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    
    
  ],
  imports: [
    CommonModule,
    
  
    RouterModule.forChild([{path:'',component:LoginComponent}])
  ]
})
export class LoginModule { }