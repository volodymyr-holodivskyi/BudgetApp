export class HistoryField{
    
    source:string|undefined;
    sourceCategory:string|undefined;
    target:string|undefined;
    targetCategory:string|undefined;
    value:string|undefined;
    operationDate:string|undefined;
    position:number;
    constructor(source:string|undefined,sourceCategory:string|undefined,target:string|undefined,targetCategory:string|undefined,value:string|undefined,date:string|undefined) {
      this.source=source;
      this.sourceCategory=sourceCategory;
      this.target=target;
      this.targetCategory=targetCategory;
      this.value=value;
      this.operationDate=date;
      this.position=-1;
    }
}