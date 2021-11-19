import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of,interval } from 'rxjs';
import {timeout} from 'rxjs/operators';
import { User } from '../../models/user';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class MainPageResolver implements Resolve<User> {
  constructor(private http:HttpService){}
 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> |Promise<User> | User{

    return this.http.getUserInfo(localStorage.getItem('id'));
  }
}
