import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsListComponent
  },
  {
    path: 'profile/:id',
    component: DoctorProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }