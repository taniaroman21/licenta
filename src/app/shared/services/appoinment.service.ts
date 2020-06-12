import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentModel, AppointmentResult } from '../models/appointment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {
  public headers: HttpHeaders;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders({
      "x-auth-token": this.localStorageService.getToken(),
    })
  }

  public makeAppointment(appointment: AppointmentModel): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/appointments', appointment, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public setAppointmentResult(result: AppointmentResult, id: string): Observable<any> {
    return this.http.put(environment.apiEndpoint + '/appointments/' + id, result, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public getClinicAppointments(clinicId: string, date?: Date): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/appointments/clinic/' + clinicId + '/?date=' + (date ? date : ''), {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public getDoctorAppointments(doctorId: string, date?: Date, clinicId?: string, patientId?: string): Observable<any> {
    let queryParams = `?date=${date ? date : ''}&patientId=${patientId ? patientId : ''}&clinicId=${clinicId ? clinicId : ''}`;
    return this.http.get(environment.apiEndpoint + `/appointments/doctor/${doctorId}/${queryParams}`, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }

  public getPatientAppointments(patientId: string, date?: Date, clinicId?: string, doctorId?: string): Observable<any> {
    let queryParams = `?date=${date ? date : ''}&clinicId=${clinicId ? clinicId : ''}&doctorId=${doctorId ? doctorId : ''}`;
    return this.http.get(environment.apiEndpoint + `/appointments/patient/${patientId}/${queryParams}`, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }

}
