import { Injectable } from '@angular/core';
import { Label } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  transformDate(dateString:string){
    let month=dateString.split('-')[1];
    switch(month){
      case '01': month='January';break;
      case '02': month='February';break;
      case '03': month='March';break;
      case '04': month='April';break;
      case '05': month='May';break;
      case '06': month='June';break;
      case '07': month='July';break;
      case '08': month='August';break;
      case '09': month='September';break;
      case '10': month='October';break;
      case '11': month='November';break;
      case '12': month='December';break;
    }
    return month+' '+dateString.split('-')[0];
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
