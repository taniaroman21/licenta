import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MenuComponent } from '../shared/menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { ClinicsService } from '../clinics/clinics.service';
import { ClinicsModule } from '../clinics/clinics.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  providers:[ClinicsService]
})
export class HomeModule { }
