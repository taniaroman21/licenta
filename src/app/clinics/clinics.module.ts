import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClinicsService } from './clinics.service';



@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  exports: [
    
  ],
  providers: [ClinicsService]
})
export class ClinicsModule { }
