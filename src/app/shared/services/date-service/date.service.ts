import { Injectable } from '@angular/core';
import { Label } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  transformDate(dateString:string){
    let date=dateString.split('T')[0].split('-').reverse().join('.');
    let time=dateString.split('T')[1].substr(0,8);
    return date+' '+time;
  }
  
  createMonthLabels(){
    let arr=[];
    let currentMonth=new Date().getMonth()+1;
    for(let i=0;i<6;i++){
      if(currentMonth<=0){
        currentMonth=12-currentMonth;
      }
      arr.push(currentMonth.toString());
      currentMonth--;
    }
    return <Label[]>arr.reverse();
  }

  monthBreakpoints(){
    let arr=[];
    let currentMonth=new Date().getMonth()+1;
    let pastMonth=currentMonth-5;
    if(pastMonth<=0){
      pastMonth=12-pastMonth;
    }
    for(let i=pastMonth;i<=currentMonth;i++){
      arr.push(i);
    }
    return arr;
  }

  getMonth(dateString:string){
    return parseInt(dateString.split('-')[1]);
  }
}
