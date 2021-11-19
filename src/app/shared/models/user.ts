interface Payments{
  category:string;
  value:number;
  icon:string;
}
export class User {
    [key:string]:any;
    id:string;
    firstName: string;
    lastName:string;
    email: string;
    password: string;
    balance:number;
    expences:number;
    lastVisitDate:string;
    avatar:string;
    incomes:Payments[];
    savings:Payments[];
    spends:Payments[];
    constructor(
      id:string,
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      balance:number,
      expences: number,
      lastVisitDate:string,
      avatar:string,
      incomes:Payments[],
      savings:Payments[],
      spends:Payments[]
    ) {
      this.id=id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.balance=balance;
      this.lastVisitDate=lastVisitDate;
      this.avatar=avatar;
      this.expences=expences;
      this.incomes=incomes;
      this.savings=savings;
      this.spends=spends;
    }
  }