import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Payments, User } from '../shared/models/user';
import { RegisterDialogComponent } from '../shared/register-dialog/register-dialog.component';
import { DateService } from '../shared/services/date-service/date.service';
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
  @ViewChild(MatMenuTrigger,{static:false}) trigger: MatMenuTrigger|undefined;
  contextMenuPosition = { x: '0px', y: '0px' };
  isLoader:boolean|undefined;
  getUserInfo=this.httpService.getUserInfo(this.userId);
  edit_index:number=-1;
  TYPE:string='';
  dialogRef?: MatDialogRef<DialogComponent>;
  editDialogRef?:MatDialogRef<RegisterDialogComponent>;
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
  constructor(private httpService: HttpService, private dialog: MatDialog,private router:Router,private dateService:DateService) {
    
  }
  
   ngOnInit(): void {
    
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
      this.user.spends=this.user.spends.filter(e=>{               
       return (((new Date().valueOf()>new Date(<string>e.date).valueOf())&&(new Date().valueOf()<new Date(<string>e.date).valueOf()+2592000000)))
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
    this.dialogRef.componentInstance.operationDate=this.dateService.dateToSQLDate(true);
    if (!this.highlight.spends && source === 'spends') {
      this.dialogRef.componentInstance.confirmMessage =
        'Activate any of savings buttons first';
      this.dialogRef.componentInstance.showCalc = false;
    }
    
    return this.dialogRef.afterClosed().subscribe(async(result) => {
      console.log(localStorage.getItem('token'));
      
     if(result){
       await this.httpService.getToken(this.userId,this.userRefreshToken)?.toPromise().then(()=>{
        this.getUserInfo.subscribe(data=>{
          this.user=data;
          this.user.spends=this.user.spends.filter(e=>{               
            return (((new Date().valueOf()>new Date(<string>e.date).valueOf())&&(new Date().valueOf()<new Date(<string>e.date).valueOf()+2592000000)))
           }                  
           )         
          for (const key in this.userInfo) {
            if (Object.prototype.hasOwnProperty.call(this.userInfo, key)) {
               this.userInfo[key]=data[key]
              
            }
          }
          
        })
       });
      
     }     
    
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

  onRightClick(event:MouseEvent,index:number,source:string){
    event.preventDefault();
    this.edit_index=index;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.trigger?.menu.focusFirstItem('mouse');
    this.trigger?.openMenu();  
    this.TYPE=source;
    
      
  }

  openDialog(type:string,mode?:string,editIndex?:number){
    this.editDialogRef=this.dialog.open(RegisterDialogComponent,{
      disableClose: false,
      hasBackdrop: true,
      width:'30%'
    })   
    this.editDialogRef.componentInstance.userId=this.userId;
    this.editDialogRef.componentInstance.addType=this.TYPE;
    this.editDialogRef.componentInstance.onExistUser=true;
    
    if(typeof editIndex!==undefined) this.editDialogRef.componentInstance.prevCategoryName=this.user[this.TYPE][<number>editIndex].category;
  
    if(mode) this.editDialogRef.componentInstance.operation=mode;
    return this.editDialogRef.afterClosed().subscribe(result=>{
      if(result){
        let tmp:Payments={
          category:this.editDialogRef?.componentInstance.addForm.controls['category'].value,
          value:parseFloat(this.editDialogRef?.componentInstance.addForm.controls['value'].value),
          icon:<string>this.editDialogRef?.componentInstance.icon,
          date:this.TYPE==='savings'?null:this.dateService.dateToSQLDate(false)
        }
        
        
        if(!mode){
         
        }else if(mode==='edit'&&editIndex!=undefined&&this.editDialogRef){
          
          this.getUserInfo.subscribe(data=>{
            this.user=data;
            this.user.spends=this.user.spends.filter(e=>{               
              return (((new Date().valueOf()>new Date(<string>e.date).valueOf())&&(new Date().valueOf()<new Date(<string>e.date).valueOf()+2592000000)))
             }                  
             )         
            for (const key in this.userInfo) {
              if (Object.prototype.hasOwnProperty.call(this.userInfo, key)) {
                 this.userInfo[key]=data[key]
                
              }
            }
            
          })
        }
        
        
      }
     
      
    })
  }

  onDelete(type:string,index:number){
    this.user[type].splice(index,1);
  }
}
