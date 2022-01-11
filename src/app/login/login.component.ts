import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { HttpService } from '../shared/services/http-service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;
  loginForm:FormGroup;
  constructor(private router:Router,private httpService:HttpService,private toastr:ToastrService,private formBuilder:FormBuilder,private route:ActivatedRoute) {
    this.loginForm=formBuilder.group({
      "email":["",[Validators.required,Validators.email]],
      "password":["",[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.toastr.overlayContainer=this.toastContainer;
    localStorage.clear();
  }
  
  login(){

  this.httpService.login(this.loginForm.controls["email"].value,this.loginForm.controls["password"].value).subscribe(data=>{
      localStorage.setItem('name',data.user.firstName);
      localStorage.setItem('surname',data.user.lastName);
      localStorage.setItem('email',data.user.email);
      localStorage.setItem('id',data.user.id);
      localStorage.setItem('balance',data.user.balance.toString());
      localStorage.setItem('expences',data.user.expences.toString());
      localStorage.setItem('token',data.token);
      localStorage.setItem('refreshToken',data.refreshToken);
      localStorage.setItem('incomes',JSON.stringify(data.user.incomes));
      localStorage.setItem('savings',JSON.stringify(data.user.savings));
      localStorage.setItem('spends',JSON.stringify(data.user.spends));
      this.router.navigate(["/main"]);
      
    })
    
  }

  toRegister(){
    this.router.navigate(["/register"]);
  }
  
}
