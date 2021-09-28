import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';

import { loginData } from '../../shared/models/loginData';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,private router:Router) { }

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

  getToken(email: string | null, refreshToken: string | null) {
    const body = {
      email: email,
      refreshToken: refreshToken,
    }; 
    if(email===null||refreshToken===null){
      
      this.router.navigate(['/login']);
      return;
    }
    return this.http.post('http://127.0.0.1:3000/auth/token', body).pipe(
      map((data: any) => {
        localStorage.setItem('token', data.token);
      })
    );
  }
}
