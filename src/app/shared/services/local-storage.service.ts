import { Injectable } from '@angular/core';

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
}
