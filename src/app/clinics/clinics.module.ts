import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClinicsService } from './clinics.service';
import { ClinicProfileComponent } from './clinic-profile/clinic-profile.component';
import { ClinicsRoutingModule } from './clinics-routing.module';
import { AppoinmentService } from '../shared/services/appoinment.service';
import { DoctorService } from '../doctors/doctor.service';
import { ReviewService } from '../shared/services/reviews.service';



@NgModule({
  declarations: [ClinicProfileComponent],
  imports: [
    SharedModule,
    ClinicsRoutingModule
  ],
  exports: [

  ],
  providers: [ClinicsService, AppoinmentService, DoctorService, ReviewService]
})
export class ClinicsModule { }
