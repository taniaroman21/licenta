import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { SharedModule } from '../shared/shared.module';
import { PatientsRoutingModule } from './patients-routing.module';



@NgModule({
  declarations: [PatientProfileComponent],
  imports: [
    SharedModule,
    PatientsRoutingModule
  ]
})
export class PatientModule { }
