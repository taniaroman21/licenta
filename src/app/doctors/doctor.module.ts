import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorService } from './doctor.service';
import { AppoinmentService } from '../shared/services/appoinment.service';
import { LocalStorageService } from '../shared/services/local-storage.service';



@NgModule({
  declarations: [DoctorProfileComponent, DoctorsListComponent],
  imports: [
    SharedModule,
    DoctorsRoutingModule
  ],
  providers: [DoctorService, AppoinmentService, LocalStorageService]
})
export class DoctorModule { }
