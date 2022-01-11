import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenu, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { Payments, User } from '../shared/models/user';
import { RegisterDialogComponent } from '../shared/register-dialog/register-dialog.component';
import { DateService } from '../shared/services/date-service/date.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  newUserData:User=new User('','','','','',0,0,'','',[],[],[]);;
  dialogRef?: MatDialogRef<RegisterDialogComponent>;
  @ViewChild(MatMenuTrigger,{static:false}) trigger: MatMenuTrigger|undefined;
  contextMenuPosition = { x: '0px', y: '0px' };
  edit_index:number=-1;
  constructor(private formBuilder:FormBuilder,private dialog:MatDialog,private dateService:DateService) {
    this.registerForm=formBuilder.group({
      "name":['',[Validators.required]],
      "surname":['',[Validators.required]],
      "email":['',[Validators.required,Validators.email]],
      "password":['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      "passwordRepeat":['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      "balance":['',[Validators.min(0)]],
      "incomes":formBuilder.array([
        ['',[Validators.min(0)]]
      ]),
      "savings":formBuilder.array([
        
      ]),
      "spends":formBuilder.array([

      ])
    })
    
   }

  ngOnInit(): void {
  }


  register(){

  }

  openDialog(type:string,mode?:string,editIndex?:number){
    this.dialogRef=this.dialog.open(RegisterDialogComponent,{
      disableClose: false,
      hasBackdrop: true,
      width:'30%'
    })   
    this.dialogRef.componentInstance.addType=type;
    if(mode) this.dialogRef.componentInstance.operation=mode;
    return this.dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let tmp:Payments={
          category:this.dialogRef?.componentInstance.addForm.controls['category'].value,
          value:parseFloat(this.dialogRef?.componentInstance.addForm.controls['value'].value),
          icon:<string>this.dialogRef?.componentInstance.icon,
          date:type==='savings'?null:this.dateService.dateToSQLDate(false)
        }
        if(!mode){
          this.newUserData[type].push(tmp);
        }else if(mode==='edit'&&editIndex!=undefined){
          this.newUserData[type][editIndex]=tmp;
        }
        
        
      }
     
      
    })
  }

  onRightClick(event:MouseEvent,index:number){
    event.preventDefault();
    this.edit_index=index;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.trigger?.menu.focusFirstItem('mouse');
    this.trigger?.openMenu();      
  }

  onDelete(type:string,index:number){
    this.newUserData[type].splice(index,1);
  }
}
