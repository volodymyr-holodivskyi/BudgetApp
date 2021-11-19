import { User } from './user';

export class loginData {
  user: User;
  token: string;
  refreshToken: string;
  constructor(userData: User, token: string, refreshToken: string) {
    this.user = new User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.balance,
      userData.expences,
      userData.lastVisitDate,
      userData.avatar,
      userData.incomes,
      userData.savings,
      userData.spends
    );
    this.token = token;
    this.refreshToken = refreshToken;
  }
}