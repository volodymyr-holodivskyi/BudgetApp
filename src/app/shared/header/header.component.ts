import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string|null='';
  userSurname:string|null='';
  userBalance:string|null='';
  userExpences:string|null='';
  currentDate:string=new Date().toLocaleDateString('ru-RU')
  constructor() { }

  ngOnInit(): void {
    this.userName=localStorage.getItem('name');
    this.userSurname=localStorage.getItem('surname');
    this.userBalance=localStorage.getItem('balance');
    this.userExpences=localStorage.getItem('expences');
  }

}
