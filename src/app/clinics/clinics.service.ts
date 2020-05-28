import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ClinicUpdateModel } from './clinics.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {
  public headers: HttpHeaders;
  constructor(public http: HttpClient, public localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders({
      "x-auth-token": this.localStorageService.getToken(),
    })
  }

  public getClinics(): Observable<any> {
    return this.http.get(environment.apiEndpoint + "/clinics");
  }

  public updateClinic(clinic: ClinicUpdateModel): Observable<any> {
    return this.http.put(environment.apiEndpoint + "/clinics/update", clinic, { headers: this.headers });
  }
}
