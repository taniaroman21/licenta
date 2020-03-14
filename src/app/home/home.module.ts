import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
        declarations: [
          HomeComponent
        ],
        imports: [
            CommonModule,
            HomeRoutingModule,
        ]      
  })
  export class HomeModule { }
  