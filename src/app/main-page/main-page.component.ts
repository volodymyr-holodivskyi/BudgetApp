import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router,RouterEvent,NavigationStart,NavigationEnd } from '@angular/router';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';

interface IOperations<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  user:User=new User('','','','','',0,0,'','',[],[],[]);
  userId = <string>localStorage.getItem('id');
  userRefreshToken = localStorage.getItem('refreshToken');
  
  isLoader:boolean|undefined;
  getUserInfo=this.httpService.getUserInfo(this.userId);
  dialogRef?: MatDialogRef<DialogComponent>;
  userInfo: IOperations<any> = {
    incomes: null,
    savings: null,
    spends: null,
  };
  highlight: IOperations<boolean> = {
    incomes: false,
    savings: false,
    spends: false,
  };
  selected: IOperations<number> = {
    incomes: -1,
    savings: -1,
    spends: -1,
  };
  choicesArray:IOperations<Array<number>>={
    incomes:[],
    savings:[]
  }
  constructor(private httpService: HttpService, private dialog: MatDialog,private router:Router) {
    
  }
  
   ngOnInit(): void {
    
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
      this.user.spends=this.user.spends.filter(e=>{               
       return (((new Date().valueOf()>new Date(e.date).valueOf())&&(new Date().valueOf()<new Date(e.date).valueOf()+2592000000)))
      }                  
      )

      
    }) 
    
    for (const key in this.userInfo) {
      if (Object.prototype.hasOwnProperty.call(this.userInfo, key)) {
        this.userInfo[key] = JSON.parse(<string>localStorage.getItem(key));
      }
    }
    
    
    
    
    this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    setInterval(() => {
      this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    }, 30000);
  }

 async openConfirmationDialog(source: string, index: number) {
    if (!this.highlight.savings && source === 'savings') return;

    this.dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
      hasBackdrop: true,
      width:'30%'
    });
    for (const key in this.selected) {
      if (Object.prototype.hasOwnProperty.call(this.selected, key)) {
        if(this.selected[key]!==-1){
          this.dialogRef.componentInstance.validValue=parseFloat(this.user[key][this.selected[key]].value);
           this.dialogRef.componentInstance.source=key;
           this.dialogRef.componentInstance.sourceCategory=this.user[key][this.selected[key]].category;
           this.choicesArray[key]=[];
        }
      }
    }
    this.dialogRef.componentInstance.userId=this.user.id
    this.dialogRef.componentInstance.target=source;
    this.dialogRef.componentInstance.targetCategory=this.user[source][index].category;
    this.dialogRef.componentInstance.showCalc=true;
    if (!this.highlight.spends && source === 'spends') {
      this.dialogRef.componentInstance.confirmMessage =
        'Activate any of savings buttons first';
      this.dialogRef.componentInstance.showCalc = false;
    }
      
    
    return this.dialogRef.afterClosed().subscribe(async(result) => {
      this.getUserInfo.subscribe(data=>{
        this.user=data;
                 
        for (const key in this.userInfo) {
          if (Object.prototype.hasOwnProperty.call(this.userInfo, key)) {
             this.userInfo[key]=data[key]
            
          }
        }
        
      })
      this.highlight[source] = false;
          
    });
  }

  moveIncome(index: number) {
    this.selected.incomes = index;
    this.selected.savings = -1;
    this.highlight.spends = false;
    this.choicesArray.incomes.push(index);
    this.highlight.savings = true;
    this.choicesArray.savings = [];
    for (let i = 0; i < this.choicesArray.incomes.length; i++) {
      if (this.choicesArray.incomes[i - 1] === index && this.choicesArray.incomes[i] === index) {
        this.highlight.savings = false;
        this.choicesArray.incomes = [];
      }
    }
  }
  moveSavings(index: number) {
    if (this.highlight.savings) return;
    this.selected.incomes = -1;
    this.selected.savings = index;
    this.choicesArray.savings.push(index);
    this.choicesArray.incomes = [];
    this.highlight.spends = true;
    for (let i = 0; i < this.choicesArray.savings.length; i++) {
      if (this.choicesArray.savings[i - 1] === index && this.choicesArray.savings[i] === index) {
        this.highlight.spends = false;
        this.choicesArray.savings=[];
      }
    }
  }
}
