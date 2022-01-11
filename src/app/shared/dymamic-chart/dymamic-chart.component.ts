import { Component, OnInit,Input,AfterContentChecked,AfterViewChecked } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatisticField } from '../models/statistic';
import { DateService} from '../services/date-service/date.service'
import { HttpService } from '../services/http-service/http.service';

interface DateNValues{
  date:string,
  value:number
}

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dymamic-chart.component.html',
  styleUrls: ['./dymamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ticks:{beginAtZero:true}}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  userId = <string>localStorage.getItem('id');
  userStatistic:StatisticField[]=[];
  public barChartData: ChartDataSets[] = [
    
  ];

  constructor(private dateService:DateService,private httpService:HttpService) { }

  ngOnInit(): void {
    this.barChartLabels=this.dateService.createMonthLabels();
    this.httpService.getUserStats(this.userId).subscribe(data=>{
      this.userStatistic=data;
      this.userStatistic.sort((a,b)=>{
        return +a.date-+b.date;
      })  
      let labels:string[]=[];
     console.log(this.userStatistic);
     
      
    let values:DateNValues[][]=[];
    let ChartData: ChartDataSets[]=[];
    
    
    for(let i=0;i<this.userStatistic.length;i++){
      if(!labels.includes(this.userStatistic[i].category)){
        labels.push(this.userStatistic[i].category);
      }
    }

    
    if(this.userStatistic.length<labels.length*6){
      // while(this.userStatistic.length!==labels.length*6){
      //   this.userStatistic.push({
      //     category:'',
      //     date:'',
      //     value:'0'
      //   });
      // }
    }
    for(let i=0;i<labels.length;i++){
      values.push([]);
      for(let j=0;j<this.dateService.createMonthArray().length;j++){
        values[i].push({date:'',value:0});
      }
      values[i].sort((a,b)=>{
        return +a.date-+b.date;
      })
     
      for(let j=0;j<this.dateService.createMonthArray().length;j++){
        values[i][j].date=this.dateService.createMonthArray()[j].toString();
      }
      console.log(values[i]);
    }

    for(let i=0;i<labels.length;i++){
      for(let j=0;j<this.userStatistic.length;j++){        
        if(this.userStatistic[j].category===labels[i]){
          for(let k=0;k<this.dateService.createMonthArray().length;k++){
            if(this.userStatistic[j].date===this.dateService.createMonthArray()[k].toString()){
              values[i][k]={date:this.dateService.createMonthArray()[k].toString(),value:+this.userStatistic[j].value}
             
              
            }
            
           
            
          }
         
        }
        
      }
      
    }
    
    
    
    for(let i=0;i<labels.length;i++){
      let obj:ChartDataSets={}
      obj.label=labels[i];
    
      obj.data=values[i].map(e=>e.value);
      console.log(obj.data);
      
      ChartData.push(obj);
      
      
    }
    this.barChartData=ChartData;
    
    
    
    })
    
    
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeChartType(value:ChartType|string){
    this.barChartType=<ChartType>value;
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
