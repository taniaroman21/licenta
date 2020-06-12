import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentModel } from '../models/appointment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public headers: HttpHeaders;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders({
      "x-auth-token": this.localStorageService.getToken(),
    })
  }

  public makeReview(review: any): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/reviews', review, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }

  public getClinicReviews(clinicId: string, pageSize: number, page: number): Observable<any> {
    return this.http.get(environment.apiEndpoint + `/reviews/clinic/${clinicId}?pageSize=${pageSize}&page=${page}`, {
      headers: new HttpHeaders({
        "x-auth-token": this.localStorageService.getToken(),
      })
    });
  }


}
