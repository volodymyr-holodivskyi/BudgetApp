import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Payments } from '../models/user';
import { DateService } from '../services/date-service/date.service';
import { HttpService } from '../services/http-service/http.service';

@Component({
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  addForm:FormGroup;
  public addType:string|undefined;
  public operation:string|undefined='Add';
  public onExistUser:boolean=false;
  public userId:string|null='';
  public prevCategoryName:string|undefined;
  public editData:Payments={
    category:'',
    value:-1,
    icon:'',
    date:null
  }
  icon:string='';
  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>,private formBuilder:FormBuilder,private httpService:HttpService,private dateService:DateService) {
    this.addForm=formBuilder.group({
      "category":['',[Validators.required,Validators.pattern(/[a-z]+/)]],
      "value":['',[Validators.required,Validators.min(0),Validators.pattern(/\d+/)]],
      "icon":['']
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.onExistUser){
      console.log(this.prevCategoryName);
      
      this.httpService.editCategory(this.userId,<string>this.addType,<string>this.prevCategoryName,{
        category:this.addForm.controls['category'].value,
        value:this.addForm.controls['value'].value,
        icon:this.icon,
        date:this.addType==='savings'?null:this.dateService.dateToSQLDate(false)
      }
      ).subscribe(data=>{
        this.dialogRef.close(true)
      });
    }
    return this.dialogRef.close(true);
    
  }
}
