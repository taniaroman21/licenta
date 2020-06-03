import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentModel } from '../models/appointment.model';
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
    return this.http.post(environment.apiEndpoint + '/appointments', appointment, { headers: this.headers });
  }

  public getClinicAppointments(clinicId: string, date?: Date): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/appointments/clinic/' + clinicId + '/?date=' + (date ? date : ''), { headers: this.headers });
  }

  public getPatientAppointments(patientId: string, date?: Date): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/appointments/patient/' + patientId + '/?date=' + (date ? date : ''), { headers: this.headers });
  }

}
