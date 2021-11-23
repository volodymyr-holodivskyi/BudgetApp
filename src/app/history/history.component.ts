import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,AfterViewInit {
  dataSource=new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort|null=null;
  @ViewChild(MatPaginator) paginator: MatPaginator|null=null;
  displayedColumns: string[] = ['position','source','target','value'];
  user:User=new User('','','','','',0,0,'','',[],[],[]);
  userId = <string>localStorage.getItem('id');
  getUserInfo=this.httpService.getUserInfo(this.userId);
  userRefreshToken = localStorage.getItem('refreshToken');
  constructor(private httpService:HttpService,private _liveAnnouncer:LiveAnnouncer) { }

  ngOnInit(): void {
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
    });
    this.httpService.getUserHistory(this.userId).subscribe(data=>{
      data.map((e:any)=>{
        e.position=data.indexOf(e)+1;
      })
      this.dataSource.data=data;
      
      console.log(this.dataSource);
    })
    this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    setInterval(() => {
      this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    }, 30000);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
