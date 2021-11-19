import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { User } from '../shared/models/user';
import { HttpService } from '../shared/services/http-service/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User=new User('','','','','',0,0,'','',[],[],[]);
  userId = <string>localStorage.getItem('id');
  getUserInfo=this.httpService.getUserInfo(this.userId);
  userRefreshToken = localStorage.getItem('refreshToken');
  dialogRef?: MatDialogRef<DialogComponent>;
  constructor(private httpService:HttpService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
      const offset = (-1)*new Date().getTimezoneOffset()/60;
      let tmpDate = this.user.lastVisitDate.slice(0,this.user.lastVisitDate.indexOf("T")).split("-");
  let tmpTime =this.user.lastVisitDate.split("T")[1].slice(0,this.user.lastVisitDate.split("T")[1].indexOf('.'));
  let tmpH=(parseInt(tmpTime.split(":")[0])+offset).toString();
  +tmpH<10?tmpH='0'+tmpH:tmpH;
  if(+tmpH>23){
    tmpH=((+tmpH)-24).toString();
    tmpDate[2]=(parseInt(tmpDate[2])+1).toString()
  }
  tmpTime=tmpH+':'+tmpTime.slice(3);
    
  this.user.lastVisitDate=tmpDate.reverse().join('.')+' '+tmpTime;
    });
    
    this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    setInterval(() => {
      this.httpService.getToken(this.userId, this.userRefreshToken)?.subscribe();
    }, 30000);
  }

  async openConfirmationDialog(category:string) {
    

    this.dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
      hasBackdrop: true,
      width:'30%'
    });
    
    this.dialogRef.componentInstance.editCategoryName=category;
    let categoryInMessage=category;
    if(category==='firstName'){
      categoryInMessage = 'name';
    }
    if(category==='lastName'){
      categoryInMessage = 'surname';
    }
    
    this.dialogRef.componentInstance.confirmMessage=`For changing ${categoryInMessage} please enter your password`;
    this.dialogRef.componentInstance.tipMessage=`Please enter new ${categoryInMessage} value`;
    this.dialogRef.componentInstance.showEditConfirm=true;
    this.dialogRef.componentInstance.showCalc=false;
    
      
    
    return this.dialogRef.afterClosed().subscribe(async(result) => {
      if(result)
      this.user[category]=this.dialogRef?.componentInstance.editFieldValue;
      
          
    });
  }
  cancelEdit(){
    this.getUserInfo.subscribe(data=>{
      this.user=data; 
      const offset = (-1)*new Date().getTimezoneOffset()/60;
      let tmpDate = this.user.lastVisitDate.slice(0,this.user.lastVisitDate.indexOf("T")).split("-");
  let tmpTime =this.user.lastVisitDate.split("T")[1].slice(0,this.user.lastVisitDate.split("T")[1].indexOf('.'));
  let tmpH=(parseInt(tmpTime.split(":")[0])+offset).toString();
  +tmpH<10?tmpH='0'+tmpH:tmpH;
  if(+tmpH>23){
    tmpH=((+tmpH)-24).toString();
    tmpDate[2]=(parseInt(tmpDate[2])+1).toString()
  }
  tmpTime=tmpH+':'+tmpTime.slice(3);
    
  this.user.lastVisitDate=tmpDate.reverse().join('.')+' '+tmpTime;
    });
  }

  saveEdit(){
    this.httpService.changeUserProfile(this.userId,this.user).subscribe();
    this.getUserInfo.subscribe(data=>{
      console.log(data);
      
      this.user=data; 
      const offset = (-1)*new Date().getTimezoneOffset()/60;
      let tmpDate = this.user.lastVisitDate.slice(0,this.user.lastVisitDate.indexOf("T")).split("-");
  let tmpTime =this.user.lastVisitDate.split("T")[1].slice(0,this.user.lastVisitDate.split("T")[1].indexOf('.'));
  let tmpH=(parseInt(tmpTime.split(":")[0])+offset).toString();
  +tmpH<10?tmpH='0'+tmpH:tmpH;
  if(+tmpH>23){
    tmpH=((+tmpH)-24).toString();
    tmpDate[2]=(parseInt(tmpDate[2])+1).toString()
  }
  tmpTime=tmpH+':'+tmpTime.slice(3);
    
  this.user.lastVisitDate=tmpDate.reverse().join('.')+' '+tmpTime;
    });
  }
}
