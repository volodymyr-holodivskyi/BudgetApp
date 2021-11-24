export class HistoryField{
    
    source:string;
    sourceCategory:string;
    target:string;
    targetCategory:string;
    value:string;
    operationDate:string;
    position:number;
    constructor(source:string,sourceCategory:string,target:string,targetCategory:string,value:string,date:string) {
      this.source=source;
      this.sourceCategory=sourceCategory;
      this.target=target;
      this.targetCategory=targetCategory;
      this.value=value;
      this.operationDate=date;
      this.position=-1;
    }
}