import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  operators:RegExp=/[\/\*\+\-]/;
  constructor() { }
  calculate(expression:string){
    let arr=expression.split(this.operators);
    let operator=expression.match(this.operators);
    
    
    if(operator!==null){
      switch(operator[0]){
        case '+':return (parseFloat(arr[0])+parseFloat(arr[1])).toPrecision(2);
        case '-':return (parseFloat(arr[0])-parseFloat(arr[1])).toPrecision(2);
        case '*':return (parseFloat(arr[0])*parseFloat(arr[1])).toPrecision(2);
        case '/':return (parseFloat(arr[0])/parseFloat(arr[1])).toPrecision(2);
      }
    }
    
    
    return parseFloat(arr[0]).toPrecision(2);
    
  }
}
