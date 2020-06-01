import { Injectable } from '@angular/core';
import { DoctorModel } from '../shared/models/doctor';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public headers: HttpHeaders;
  constructor(public http: HttpClient, public localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders({
      "x-auth-token": this.localStorageService.getToken(),
    })
  }

  public getDoctors(clinicId?: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + "/doctors/?clinicId=" + clinicId);
  }

  public addDoctor(doctor: DoctorModel): Observable<any> {
    return this.http.post(environment.apiEndpoint + "/doctors/register", doctor, { headers: this.headers });
  }
}
