import { Component, OnInit,Input } from '@angular/core';
import { trigger,transition,state,style,animate} from '@angular/animations'
import { User } from '../models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[
    trigger('menuTrigger',[
      state('open',style({
        width:'15%',
        opacity:1   
      })),
      state('closed',style({
        width:'0',
       opacity:0
      })),
      transition('open=>closed',[
        animate('0.3s')
      ]),
      transition('closed=>open',[
        animate('0.4s')
      ])
    ]),
    trigger('backdropTrigger',[
      state('open',style({
        opacity:1,
        zIndex:1000
      })),
      state('closed',style({
        opacity:0,
        zIndex:-1
      })),
      transition('open=>closed',[
        animate('0.6s')
      ]),
      transition('closed=>open',[
        animate('0.5s')
      ])
    ]),
    trigger('menuzIndex',[
      state('open',style({
        zIndex:1001
      })),
      state('closed',style({
        zIndex:-1
      })),
      transition('open=>closed',[
        animate('1.5s')
      ]),
      transition('closed=>open',[
        animate('0.5s')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
 
  @Input()user:User=new User('','','','','',0,0,'','',[],[],[]);
  showMenu:boolean=false;
  currentDate:string=new Date().toLocaleDateString('ru-RU')
  constructor() { }

  ngOnInit(): void {

  }
 
  toggleMenu(){
    this.showMenu=!this.showMenu;
  }
  closeMenu(){
    this.showMenu=false;
  }
}
