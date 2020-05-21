import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {

  constructor(public http: HttpClient) { }

  public getClinics(): Observable<any>{
    return this.http.get(environment.apiEndpoint + "/clinics");
  }
}
