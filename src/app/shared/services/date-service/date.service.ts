import { Injectable } from '@angular/core';

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
  
}
