import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { DoctorModel } from 'src/app/shared/models/doctor';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  public doctors: DoctorModel[];
  constructor(private doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    })
  }

}
