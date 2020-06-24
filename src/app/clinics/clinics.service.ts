import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ClinicUpdateModel } from './clinics.model';
import { ImageModel } from '../shared/models/image.model';

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

  public getClinics(pageSize?: number, page?: number, filter?: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + `/clinics?page=${page}&pageSize=${pageSize}&filter=${filter}`);
  }

  public getClinic(id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + "/clinics/" + id);
  }

  public updateClinic(clinic: ClinicUpdateModel): Observable<any> {
    return this.http.put(environment.apiEndpoint + "/clinics/update", clinic, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
  public uploadProfile(file: ImageModel, clinicId: string): Observable<any> {
    console.log(file)
    return this.http.put(environment.apiEndpoint + `/clinics/${clinicId}/upload`, file, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }
}
