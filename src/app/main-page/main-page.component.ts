import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { HttpService } from '../shared/services/http.service';

interface IOperations<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  userEmail = localStorage.getItem('email');
  userRefreshToken = localStorage.getItem('refreshToken');
  dialogRef?: MatDialogRef<DialogComponent>;
  incomesArr: Array<number> = [];
  savingsArr: Array<number> = [];
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
  constructor(private httpService: HttpService, private dialog: MatDialog) {}

  ngOnInit(): void {
    for (const key in this.userInfo) {
      if (Object.prototype.hasOwnProperty.call(this.userInfo, key)) {
        this.userInfo[key] = JSON.parse(<string>localStorage.getItem(key));
      }
    }

    this.httpService.getToken(this.userEmail, this.userRefreshToken);
    setInterval(() => {
      this.httpService.getToken(this.userEmail, this.userRefreshToken);
    }, 30000);
  }

  openConfirmationDialog(source: string, index: number) {
    if (!this.highlight.savings && source === 'savings') return;

    this.dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
      hasBackdrop: true,
    });
    this.dialogRef.componentInstance.showOkBtn = true;
    if (this.highlight.savings && source === 'savings') {
      this.dialogRef.componentInstance.confirmMessage = `Move ${
        this.userInfo.incomes[this.selected.incomes].category
      } into ${this.userInfo.savings[index].category}?`;
    }
    if (this.highlight.spends && source === 'spends') {
      this.dialogRef.componentInstance.confirmMessage = `Use ${
        this.userInfo.savings[this.selected.savings].category
      } on ${this.userInfo.spends[index].category}?`;
    }
    if (!this.highlight.spends && source === 'spends') {
      this.dialogRef.componentInstance.confirmMessage =
        'Activate any of savings buttons first';
      this.dialogRef.componentInstance.showOkBtn = false;
    }
    return this.dialogRef.afterClosed().subscribe((result) => {
      if (result) this.highlight[source] = false;
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
