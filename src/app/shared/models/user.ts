interface Payments{
  category:string;
  value:number;
  icon:string;
}
export class User {
    [key:string]:any;
    firstName: string;
    lastName:string;
    email: string;
    password: string;
    balance:number;
    expences:number;
    incomes:Payments[];
    savings:Payments[];
    spends:Payments[];
    constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      balance:number,
      expences: number,
      incomes:Payments[],
      savings:Payments[],
      spends:Payments[]
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.balance=balance;
      this.expences=expences;
      this.incomes=incomes;
      this.savings=savings;
      this.spends=spends;
    }
  }