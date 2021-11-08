import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user:User=new User('','','','',0,0,[],[],[]);
  userEmail = <string>localStorage.getItem('email');
  getUserInfo=this.httpService.getUserInfo(this.userEmail);
  userRefreshToken = localStorage.getItem('refreshToken');
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
    });
    this.httpService.getToken(this.userEmail, this.userRefreshToken)?.subscribe();
    this.httpService.getUserSettings(this.userEmail).subscribe(data=>console.log(data)
    );
    setInterval(() => {
      this.httpService.getToken(this.userEmail, this.userRefreshToken)?.subscribe();
    }, 30000);
  }

}
