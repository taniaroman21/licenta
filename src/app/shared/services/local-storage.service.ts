import { Injectable } from '@angular/core';
import { UserRegisterModel } from 'src/app/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public setUserType(userType: string): void {
    localStorage.setItem('userType', userType);
  }
  public getUserType(): string {
    return localStorage.getItem('userType');
  }

  public getUser(): UserRegisterModel {
    return JSON.parse(localStorage.getItem('user'));
  }
  public setUser(user: UserRegisterModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
