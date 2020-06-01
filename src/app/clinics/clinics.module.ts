import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClinicsService } from './clinics.service';
import { ClinicProfileComponent } from './clinic-profile/clinic-profile.component';
import { ClinicsRoutingModule } from './clinics-routing.module';
import { AppoinmentService } from '../shared/services/appoinment.service';



@NgModule({
  declarations: [ClinicProfileComponent],
  imports: [
    SharedModule,
    ClinicsRoutingModule
  ],
  exports: [

  ],
  providers: [ClinicsService, AppoinmentService]
})
export class ClinicsModule { }
