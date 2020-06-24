import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public headers: HttpHeaders;
  constructor(public http: HttpClient, public localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders({
      "x-auth-token": this.localStorageService.getToken(),
    })
  }


  public getPatient(id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/users/' + id, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public updatePatient(body: any, id: string): Observable<any> {
    return this.http.put(environment.apiEndpoint + '/users/' + id, body, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    })
  }
  public uploadProfile(fileInfo: any, id: string): Observable<any> {
    console.log(fileInfo)
    return this.http.put(environment.apiEndpoint + `/users/${id}/upload/`, fileInfo, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
        // 'Content-Type': 'multipart/form-data'
      }),
    });
  }
}
