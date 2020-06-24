import { Injectable } from '@angular/core';
import { DoctorModel, DoctorRegisterModel } from '../shared/models/doctor';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { DoctorUpdateModel } from './doctor.model';

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

  public getDoctors(pageSize?: number, page?: number, filter?: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + `/doctors?page=${page}&pageSize=${pageSize}&filter=${filter}`);
  }
  public getDoctor(id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + `/doctors/${id}`, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public getPatients(id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + `/doctors/${id}/patients`, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public updateDoctor(doctor: DoctorUpdateModel): Observable<any> {
    return this.http.put(environment.apiEndpoint + "/doctors/update", doctor, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public getClinicDoctors(clinicId: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + `/doctors/clinic/${clinicId}`);
  }

  public addDoctor(doctor: DoctorRegisterModel): Observable<any> {
    return this.http.post(environment.apiEndpoint + "/doctors/register", doctor, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public uploadProfile(fileInfo: any, id: string): Observable<any> {

    return this.http.put(environment.apiEndpoint + `/doctors/${id}/upload/`, fileInfo, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
        // 'Content-Type': 'multipart/form-data'
      }),
    });
  }
}
