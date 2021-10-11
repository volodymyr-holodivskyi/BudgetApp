import { Component, ElementRef, ViewChild, HostListener,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { HttpService } from '../services/http-service/http.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

interface buttonStyles {
  value: string;
  styles: string;
  icon?: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit{
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;
  availableSymbols: RegExp = /[0-9\/\*\+\-\.]/;
  operators: RegExp = /[\/\*\+\-]/;
  
  public confirmMessage: string | undefined;
  public showCalc: boolean | undefined;
  public userEmail: string | undefined;
  public validValue: number | undefined;
  public source: string | undefined;
  public sourceCategory: string | undefined;
  public target: string | undefined;
  public targetCategory: string | undefined;
  @ViewChild('screenContent') screenContent: ElementRef;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.availableSymbols.test(event.key)) {
      
      
      if (event.key === 'Backspace') {
        this.onBackspace();
        return;
      }
      if (event.key === 'Enter') {
        this.onEnter();
        return;
      }
      return;
    }
    this.changeContent(event.key);
  }
  buttons: buttonStyles[] = [
    { value: 'AC', styles: 'char col-6' },
    { value: 'DEL', styles: 'char col-3' },
    { value: '+', styles: 'char col-3' },
    { value: '7', styles: 'char col-3' },
    { value: '8', styles: 'char col-3' },
    { value: '9', styles: 'char col-3' },
    { value: '-', styles: 'char col-3' },
    { value: '4', styles: 'char col-3' },
    { value: '5', styles: 'char col-3' },
    { value: '6', styles: 'char col-3' },
    { value: '/', styles: 'char col-3' },
    { value: '1', styles: 'char col-3' },
    { value: '2', styles: 'char col-3' },
    { value: '3', styles: 'char col-3' },
    { value: '*', styles: 'char col-3' },
    { value: '0', styles: 'char col-6' },
    { value: '.', styles: 'char col-3' },
    { value: '', styles: 'char col-3', icon: 'bi bi-check-lg' },
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private elementRef: ElementRef,
    private calculator: CalculatorService,
    private http: HttpService,
    private toastr:ToastrService
  ) {
    this.screenContent =
      this.elementRef.nativeElement.querySelector('.screenContent');
      
  }
  ngOnInit(){
    this.toastr.overlayContainer=this.toastContainer;
  }

  changeContent(value: string) {
    if (value === 'AC') {
      this.screenContent.nativeElement.innerHTML = '';
      return;
    }
    if (value === 'DEL') {
      this.onBackspace();
      return;
    }
    if (
      value === '.' &&
      this.screenContent.nativeElement.innerHTML[
        this.screenContent.nativeElement.innerHTML.length - 1
      ] === '.'
    ) {
      return;
    }
    if (value === '') {
      this.onEnter();
    }
    if(this.operators.test(value)&&this.operators.test(this.screenContent.nativeElement.innerHTML[
      this.screenContent.nativeElement.innerHTML.length - 1
    ])){
      return;
    }
    if (
      this.operators.test(value) &&
      this.operators.test(this.screenContent.nativeElement.innerHTML)
    ) {
      this.screenContent.nativeElement.innerHTML = this.calculator.calculate(
        this.screenContent.nativeElement.innerHTML
      );
    }
    this.screenContent.nativeElement.innerHTML += value;
  }

 onEnter() {
  

    if (!this.screenContent.nativeElement.innerHTML) {
      throw new Error('Empty expression aren`t available');
    }
    if (
      this.operators.test(
        this.screenContent.nativeElement.innerHTML[
          this.screenContent.nativeElement.innerHTML.length - 1
        ]
      )
    ) {
      throw new Error('Incorect expression');
    }
    if (
      this.validValue !== undefined &&
      parseFloat(this.screenContent.nativeElement.innerHTML) > this.validValue
    ) {
      throw new Error(`Not enough money in ${this.sourceCategory}`);
    }
    if(parseFloat(this.screenContent.nativeElement.innerHTML)<0){
      throw new Error('Value can`t be negative');
    }
    if(this.operators.test(this.screenContent.nativeElement.innerHTML)){
      this.screenContent.nativeElement.innerHTML = this.calculator.calculate(
        this.screenContent.nativeElement.innerHTML
      );
      return;
    }
    if (!this.operators.test(this.screenContent.nativeElement.innerHTML)) {
      this.target === 'savings'
        ?this.http.moveIncomeInSavings(
            <string>this.userEmail,
            this.sourceCategory,
            this.targetCategory,
            parseFloat(this.screenContent.nativeElement.innerHTML)
          ).toPromise().then(data=>this.dialogRef.close(true))
        :this.http.moveSavingInSpends(
            <string>this.userEmail,
            this.sourceCategory,
            this.targetCategory,
            parseFloat(this.screenContent.nativeElement.innerHTML)
          ).toPromise().then(data=>this.dialogRef.close(true))
            
    }
    
    this.screenContent.nativeElement.innerHTML = this.calculator.calculate(
      this.screenContent.nativeElement.innerHTML
    );
  
  }
  onBackspace() {
    this.screenContent.nativeElement.innerHTML =
      this.screenContent.nativeElement.innerHTML.slice(0, -1);
    return;
  }
}
