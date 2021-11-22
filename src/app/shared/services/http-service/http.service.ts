import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';

import { loginData } from '../../models/loginData';
import { Router } from '@angular/router';
import { StatisticField } from '../../models/statistic';
import { DateService } from '../date-service/date.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,private router:Router,private dateService:DateService) { }

  login(email: string, password: string): Observable<loginData> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post('http://127.0.0.1:3000/auth', body).pipe(
      map((data: any) => {    
        return new loginData(data.user, data.token, data.refreshToken);
      })
    );
  }

  getToken(id: string | null, refreshToken: string | null) {
    const body = {
      id: id,
      refreshToken: refreshToken,
    }; 
    if(id===null||refreshToken===null){
      
      this.router.navigate(['/login']);
      return;
    }
    return this.http.post('http://127.0.0.1:3000/auth/token', body).pipe(
      map((data: any) => {
        localStorage.setItem('token', data.token);
      })
    );
  }

  getUserInfo(id:string|null){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const params=new HttpParams().set(
      'id',<string>id
    );
    return this.http.get('http://127.0.0.1:3000/api/get/', {params,headers}).pipe(
      map((data: any) => {    
        return new User(data.user.id,data.user.firstName,data.user.lastName,data.user.email,data.user.password,data.user.balance,data.user.expences,data.user.lastVisitDate,data.user.avatar,data.user.incomes,data.user.savings,data.user.spends)
      })
    )}

  moveIncomeInSavings(id:string|null,incomesCategory:string|undefined,savingsCategory:string|undefined,value:number){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const body={
      id: id,
      incomesCategory: incomesCategory,
      savingsCategory:savingsCategory,
      value: value
    }

  
    return this.http.post('http://127.0.0.1:3000/api/save',body,{headers}).pipe(
      map((data:any)=>{
        return new User(data.user.id,data.user.firstName,data.user.lastName,data.user.email,data.user.password,data.user.balance,data.user.expences,data.user.lastVisitDate,data.user.avatar,data.user.incomes,data.user.savings,data.user.spends)
      })
    )
  }

  moveSavingInSpends(id:string|null,savingsCategory:string|undefined,spendsCategory:string|undefined,value:number){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const body={
      id: id,
      savingsCategory: savingsCategory,
      spendsCategory: spendsCategory,
      value: value
    }
    return this.http.post('http://127.0.0.1:3000/api/spend',body,{headers}).pipe(
      map((data:any)=>{
        return new User(data.user.id,data.user.firstName,data.user.lastName,data.user.email,data.user.password,data.user.balance,data.user.expences,data.user.lastVisitDate,data.user.avatar,data.user.incomes,data.user.savings,data.user.spends)
      
      })
    )
  }

  getUserStats(id:string|null):Observable<StatisticField[]>{
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const params=new HttpParams().set(
      'id',<string>id
    );
    return this.http.get('http://127.0.0.1:3000/stats',{headers:headers,params:params}).pipe(
      map((data:any)=>{
        data.map((e:StatisticField)=>{   
          e.date=this.dateService.getMonth(e.date).toString();    
          return new StatisticField(e.category,e.value,e.date);
        })
        
        return data;
        
        
      })
    )
  }

  getUserHistory(id:string|null){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const params=new HttpParams().set(
      'id',<string>id
    );
    return this.http.get('http://127.0.0.1:3000/history',{headers:headers,params:params}).pipe(
      map((data:any)=>{
        
        return data;
      })
    )
  }

  getUserSettings(id:string|null){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const params=new HttpParams().set(
      'id',<string>id
    );
    return this.http.get('http://127.0.0.1:3000/settings',{headers:headers,params:params}).pipe(
      map((data:any)=>{
        
        return data;
      })
    )
  }

  sendPassword(id:string|null,password:string){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const body={
      id: id,
      password: password
    }
    return this.http.post('http://127.0.0.1:3000/api/password/check',body,{headers}).pipe(
      map((data:any)=>{
        return data;
      })
    )
  }

  changeUserProfile(id:string|null,userData:User){
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const body={
      id: id,
      userData: userData
    }
    return this.http.post('http://127.0.0.1:3000/api/edit',body,{headers}).pipe(
      map((data:any)=>{
        
        return new User(data.user.id,data.user.firstName,data.user.lastName,data.user.email,data.user.password,data.user.balance,data.user.expences,data.user.lastVisitDate,data.user.avatar,data.user.incomes,data.user.savings,data.user.spends)
      
      })
    )
  }
}

