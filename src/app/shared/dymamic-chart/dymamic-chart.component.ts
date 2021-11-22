import { Component, OnInit,Input,AfterContentChecked,AfterViewChecked } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatisticField } from '../models/statistic';
import { DateService} from '../services/date-service/date.service'
import { HttpService } from '../services/http-service/http.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dymamic-chart.component.html',
  styleUrls: ['./dymamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
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
      
      
      let labels:string[]=[];
    let values:number[][]=[];
    let ChartData: ChartDataSets[]=[];
    
    
    for(let i=0;i<this.userStatistic.length;i++){
      if(!labels.includes(this.userStatistic[i].category)){
        labels.push(this.userStatistic[i].category);
      }
    }
    
    //console.log(this.dateService.monthBreakpoints());
    
    //console.log(values);
    
    if(this.userStatistic.length<labels.length*6){
      while(this.userStatistic.length!==labels.length*6){
        this.userStatistic.push({
          category:'',
          date:'',
          value:'0'
        });
      }
    }
    let counter=1;
    for(let i=0;i<this.userStatistic.length;i++){
      
      if(this.userStatistic[i].category===''){
       
        this.userStatistic[i].category=labels[labels.indexOf(this.userStatistic[i-counter].category)]
          console.log(labels[labels.indexOf(this.userStatistic[i-counter].category)]);
          
        
        counter+=2;
      }
    }
    for(let i=0;i<labels.length;i++){
      values.push([]);
      for(let j=0;j<this.userStatistic.length;j++){
        if(this.userStatistic[j].category===labels[i]){
          values[i].push(parseFloat(this.userStatistic[j].value))
        }
      }
      
    }
    console.log(this.userStatistic);

    for(let i=0;i<labels.length;i++){
      let obj:ChartDataSets={}
      obj.label=labels[i];
      //const tmp= this.userStatistic.filter(e=>e.category===labels[i]);
      //obj.data=tmp.map(e=>parseFloat(e.value)).reverse();
      obj.data=values[i].reverse();
      ChartData.push(obj);
    }
    this.barChartData=ChartData;
    //console.log(ChartData);
    
    //const tmp=this.userStatistic?.map(e=>e.value);
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
