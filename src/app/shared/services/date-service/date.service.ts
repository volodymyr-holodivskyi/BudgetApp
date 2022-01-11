import { Injectable } from '@angular/core';
import { Label } from 'ng2-charts';

export interface DateParameters{
  year:number,
  month:number,
  day:number,
  hour:number,
  minute:number,
  second:number
}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  monthNumberToString(number:number){
    switch(number){
      case 1:return 'January';
      case 2:return 'February';
      case 3:return 'March';
      case 4:return 'April';
      case 5:return 'May';
      case 6:return 'June';
      case 7:return 'July';
      case 8:return 'August';
      case 9:return 'September';
      case 10:return 'October';
      case 11:return 'November';
      case 12:return 'December';
      default :return null;
    }
  }

  dateToSQLDate(current:boolean){
    let tmpDate=new Date().toLocaleDateString('ru-RU').split('.').reverse();
    let tmpTime=new Date().toLocaleTimeString('ru-RU');
    if(!current){
      tmpDate[2]='01';
    }
    return current?tmpDate.join('-')+' '+tmpTime :tmpDate.join('-')+' 12:00:00';
  }
  


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

      arr.push(this.monthNumberToString(currentMonth)+' '+new Date().getFullYear().toString());
      currentMonth--;
    }

    return <Label[]>arr.reverse();
  }

  createMonthArray(){
    let arr=[];
    let currentMonth=new Date().getMonth()+1;
    for(let i=0;i<6;i++){
      if(currentMonth<=0){
        currentMonth=12-currentMonth;
      }

      arr.push(currentMonth);
      currentMonth--;
    }

    return arr.reverse();
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

  splitDateString(dateString:string):DateParameters{
    let day = parseInt(dateString.split(" ")[0].split('.')[0]);
    let month = parseInt (dateString.split(" ")[0].split('.')[1]);
    let year = parseInt (dateString.split(" ")[0].split('.')[2]);
    let hour = parseInt (dateString.split(" ")[1].split(':')[0]);
    let minute = parseInt (dateString.split(" ")[1].split(':')[1]);
    let second = parseInt (dateString.split(" ")[1].split(':')[2]);
    return {
     day:day,
     month:month,
     year:year,
     hour:hour,
     minute:minute,
     second:second      
    }
  }
}
