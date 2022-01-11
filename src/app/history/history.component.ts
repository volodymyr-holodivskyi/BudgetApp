import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DateService } from '../shared/services/date-service/date.service';
import { HistoryField } from '../shared/models/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,AfterViewInit {
  dataSource=new MatTableDataSource<HistoryField>();
  @ViewChild(MatSort) sort: MatSort|null=null;
  @ViewChild(MatPaginator) paginator: MatPaginator|null=null;
  displayedColumns: string[] = ['position','source','sourceCategory','target','targetCategory','value','date'];
  user:User=new User('','','','','',0,0,'','',[],[],[]);
  userId = <string>localStorage.getItem('id');
  getUserInfo=this.httpService.getUserInfo(this.userId);
  userRefreshToken = localStorage.getItem('refreshToken');
  constructor(private httpService:HttpService,private _liveAnnouncer:LiveAnnouncer,private dateService:DateService) { }

  ngOnInit(): void {
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
    });
    this.httpService.getUserHistory(this.userId).subscribe(data=>{
      data.map((e)=>{
        e.operationDate=this.dateService.transformDate(<string>e.operationDate);
      })
      data.sort((a,b)=>{
        let tmpA = this.dateService.splitDateString(<string>a.operationDate);
        let tmpB = this.dateService.splitDateString(<string>b.operationDate);
        return  (new Date(tmpB.year,tmpB.month,tmpB.day,tmpB.hour,tmpB.minute,tmpB.second).valueOf())-(new Date(tmpA.year,tmpA.month,tmpA.day,tmpA.hour,tmpA.minute,tmpA.second).valueOf());
      })
      data.map((e)=>{
        e.position=data.indexOf(e)+1;
      })
      this.dataSource.data=data;
      
    })
    this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    setInterval(() => {
      this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    }, 30000);
  }
  ngAfterViewInit(): void {
  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
  }
  announceSortChange(sortState: Sort) {
    this.dataSource.data=this.dataSource.data.sort((a,b)=>{
      return new Date(<string>a.operationDate).valueOf() > new Date(<string>b.operationDate).valueOf()?1:-1;
    })
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
