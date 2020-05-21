import { Component, OnInit } from '@angular/core';
import { ClinicsService } from '../clinics/clinics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public clinics: any[];
  constructor(public clinicService: ClinicsService) { }

  ngOnInit() {
    this.clinicService.getClinics().subscribe(clinics => {
      this.clinics = clinics;
      console.log(clinics)
  })
  }

}
