import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  public registerUser(userBodyReq: any): Observable<any> {
    return this.http.post<any>('/register', userBodyReq);
  }
}
