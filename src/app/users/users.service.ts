import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { UserRegisterModel, ClinicRegisterModel } from './user.model';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public http: HttpClient, public localStorageService: LocalStorageService) { }

  public token = this.localStorageService.getToken();
  public header: HttpHeaders = new HttpHeaders({
    'x-auth-token': this.token
  })

  public registerUser(userBodyReq: UserRegisterModel): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/users/register', userBodyReq, { responseType: 'text' });
  }
  public registerClinic(clinicBodyReq: ClinicRegisterModel): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/clinics/register', clinicBodyReq, { responseType: 'text' });
  }

  public getLogin(userLoginReq): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/auth', userLoginReq, { responseType: 'json' });
  }
}
