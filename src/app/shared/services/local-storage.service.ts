import { Injectable } from '@angular/core';
import { UserRegisterModel } from 'src/app/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }
  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public setUserType(userType: string): void {
    sessionStorage.setItem('userType', userType);
  }
  public getUserType(): string {
    return sessionStorage.getItem('userType');
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem('user'));
  }
  public setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}
