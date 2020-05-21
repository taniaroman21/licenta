import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClinicListItemComponent } from './clinic-list-item/clinic-list-item.component';
import { MatDividerModule } from '@angular/material/divider'



@NgModule({
  declarations: [MenuComponent, ClinicListItemComponent],
  exports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MenuComponent,
    ClinicListItemComponent,
    RouterModule,
    HttpClientModule
  ]
})
export class SharedModule { }
