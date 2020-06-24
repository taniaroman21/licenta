import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClinicListItemComponent } from './clinic-list-item/clinic-list-item.component';
import { MatDividerModule } from '@angular/material/divider'
import { UsersService } from '../users/users.service';
import { MatMenuModule } from '@angular/material/menu';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator/paginator.component';
import { PagerService } from './services/pager.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResourcesService } from './services/resources.service';
import { UtilsService } from './services/utils.service';



@NgModule({
  declarations: [MenuComponent, ClinicListItemComponent, SideNavComponent, CalendarComponent, ModalComponent, PaginatorComponent],
  exports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatMenuModule,
    MenuComponent,
    ClinicListItemComponent,
    RouterModule,
    HttpClientModule,
    SideNavComponent,
    CalendarComponent,
    FontAwesomeModule,
    MatExpansionModule,
    MatDialogModule,
    ModalComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    PaginatorComponent,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule

  ],
  providers: [UsersService, PagerService, ResourcesService, UtilsService]
})
export class SharedModule { }
