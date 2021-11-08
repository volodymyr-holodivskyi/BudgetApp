import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  user:User=new User('','','','',0,0,[],[],[]);
  userEmail = <string>localStorage.getItem('email');
  getUserInfo=this.httpService.getUserInfo(this.userEmail);
  userRefreshToken = localStorage.getItem('refreshToken');
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
    });
    this.httpService.getUserHistory(this.userEmail).subscribe(data=>{
      console.log(data);
      
    })
    this.httpService.getToken(this.userEmail, this.userRefreshToken)?.subscribe();
    setInterval(() => {
      this.httpService.getToken(this.userEmail, this.userRefreshToken)?.subscribe();
    }, 30000);
  }
}
