import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  @Input()user:User=new User('','','','',0,0,[],[],[]);

  currentDate:string=new Date().toLocaleDateString('ru-RU')
  constructor() { }

  ngOnInit(): void {
    
    
  }
 
}
