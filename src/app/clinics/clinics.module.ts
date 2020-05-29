import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClinicsService } from './clinics.service';
import { ClinicProfileComponent } from './clinic-profile/clinic-profile.component';
import { ClinicsRoutingModule } from './clinics-routing.module';



@NgModule({
  declarations: [ClinicProfileComponent],
  imports: [
    SharedModule,
    ClinicsRoutingModule
  ],
  exports: [

  ],
  providers: [ClinicsService]
})
export class ClinicsModule { }
