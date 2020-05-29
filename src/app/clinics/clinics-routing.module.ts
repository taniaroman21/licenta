import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicProfileComponent } from './clinic-profile/clinic-profile.component';

const routes: Routes = [

  {
    path: 'profile',
    component: ClinicProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule { }