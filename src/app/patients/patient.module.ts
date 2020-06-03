import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { SharedModule } from '../shared/shared.module';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientService } from './patient.service';
import { AppoinmentService } from '../shared/services/appoinment.service';



@NgModule({
  declarations: [PatientProfileComponent],
  imports: [
    SharedModule,
    PatientsRoutingModule
  ],
  providers: [PatientService, AppoinmentService]
})
export class PatientModule { }
