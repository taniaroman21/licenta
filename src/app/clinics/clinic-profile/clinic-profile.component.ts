import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ClinicsService } from '../clinics.service';
import { ClinicUpdateModel } from '../clinics.model';

@Component({
  selector: 'app-clinic-profile',
  templateUrl: './clinic-profile.component.html',
  styleUrls: ['./clinic-profile.component.scss']
})
export class ClinicProfileComponent implements OnInit {
  public clinic: any;
  constructor(public localStorageService: LocalStorageService, public clinicService: ClinicsService) { }

  ngOnInit(): void {
    this.clinic = this.localStorageService.getUser();
  }

  public updateClinic() {
    this.clinicService.updateClinic(this.clinic as ClinicUpdateModel).subscribe(response => {
      this.clinic = response;
    }
    )
  }
}
