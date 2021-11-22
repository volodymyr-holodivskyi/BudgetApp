import { Component, OnInit } from '@angular/core';
import { StatisticField } from '../shared/models/statistic';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  user:User=new User('','','','','',0,0,'','',[],[],[]);
  userId = <string>localStorage.getItem('id');
  getUserInfo=this.httpService.getUserInfo(this.userId);
  userRefreshToken = localStorage.getItem('refreshToken');
  userStatistic:StatisticField[]=[];
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
    });
    this.httpService.getUserStats(this.userId).subscribe(data=>{
      this.userStatistic=data;
    })
    this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    setInterval(() => {
      this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    }, 30000);
  }

}
