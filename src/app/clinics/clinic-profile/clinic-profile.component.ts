import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ClinicsService } from '../clinics.service';
import { ClinicUpdateModel } from '../clinics.model';
import { ActivatedRoute } from '@angular/router';
import { AppointmentDisplayModel, AppointmentShortModel } from 'src/app/shared/models/appointment.model';
import { AppoinmentService } from 'src/app/shared/services/appoinment.service';
import { DoctorModel } from 'src/app/shared/models/doctor';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-clinic-profile',
  templateUrl: './clinic-profile.component.html',
  styleUrls: ['./clinic-profile.component.scss']
})
export class ClinicProfileComponent implements OnInit {
  public currentUserId: String;
  public clinic: any;
  public appointments: AppointmentDisplayModel[] | AppointmentShortModel[];
  public doctors: DoctorModel[];
  public filteredDoctors: DoctorModel[];
  public sideNavButtons: string[];
  public activeButtons: boolean[];
  public selectedDateAppointments: AppointmentDisplayModel[];
  public startHour: number;
  public endHour: number;
  public workingHours: string[] = [];
  public doctorFields: boolean[];
  public faPlus = faPlus;
  constructor(public localStorageService: LocalStorageService,
    public clinicService: ClinicsService,
    private route: ActivatedRoute,
    private appointmentsService: AppoinmentService,
    private doctorService: DoctorService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUserId = this.localStorageService.getUser() ? this.localStorageService.getUser()._id : undefined;
    this.sideNavButtons = this.currentUserId ? ["Details", "Doctors", "Schedule"] : ["Details", "Doctors"]
    this.route.params.subscribe(params => {
      this.getClinic(params.id);
    });
  }
  public getClinic(id: string): void {
    this.clinicService.getClinic(id).subscribe(clinic => {
      this.clinic = clinic;
      this.doctorFields = new Array(clinic.fields.length + 1).fill(false);
      this.doctorFields[0] = true;
      this.startHour = parseInt(this.clinic.workingHours[0].substr(0, 2));
      this.endHour = parseInt(this.clinic.workingHours[1].substr(0, 2));
      this.workingHours = [];
      for (let i = this.startHour; i <= this.endHour; i++) {
        if (i < 10) {
          this.workingHours.push("0" + i + ":00");
        }
        else {
          this.workingHours.push(i + ":00");
        }
      }

      this.appointmentsService.getClinicAppointments(this.clinic._id).subscribe(app => {
        this.appointments = app;
      });
      this.doctorService.getClinicDoctors(this.clinic._id).subscribe(response => {
        this.doctors = response;
        this.toggleField(0, this.clinic.fields[0])
      })
    });
  }

  public updateClinic() {
    this.clinicService.updateClinic(this.clinic as ClinicUpdateModel).subscribe(response => {
      this.clinic = response;
    }
    )
  }

  public clickSideNav(event) {
    this.activeButtons = event;
  }
  public clickCalendar(event) {
    let user = this.localStorageService.getUserType();
    switch (user) {
      case "clinic":
        if (this.clinic._id == this.currentUserId) {
          this.appointmentsService.getClinicAppointments(this.clinic._id, event).subscribe(res => {
            this.selectedDateAppointments = res;
            this.selectedDateAppointments.sort((a: AppointmentDisplayModel, b: AppointmentDisplayModel) => {
              return (a.hour > b.hour) ? 1 : -1;
            })
            console.log(this.selectedDateAppointments)
          })
        }
        break;
      case "patient":
        this.openAppointmentDialog(event);
        break;
    }

  }
  public formatDate(date: Date) {
    return new Date(date).toDateString();
  }
  public countAppointments(hour: string, appointments: AppointmentDisplayModel[]): number {
    let counter = 0;
    appointments.forEach(app => {
      if (hour == app.hour)
        counter++;
    });
    return counter;
  }
  public filterDoctors(field?: string): DoctorModel[] {
    let doctors = this.doctors.filter((value: DoctorModel, index: number, doctors: DoctorModel[]) => {
      return value.fields.includes(field);
    });
    return field ? doctors : this.doctors;
  }
  public toggleField(index: number, field?: string) {
    this.filteredDoctors = this.filterDoctors(field);
    this.doctorFields.fill(false);
    this.doctorFields[index] = true;
  }

  public openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, { data: { type: "addDoctor" }, width: '600px' });
    dialogRef.afterClosed().subscribe(response => {
      this.doctorService.addDoctor({ clinicId: this.clinic._id, ...response }).subscribe(res => {
        this.getClinic(this.clinic._id);
      })
    })
  }
  public openAppointmentDialog(date: Date) {
    if (this.currentUserId) {
      let formattedDate = moment(date).format('YYYY-MM-DD');
      let dialogRef = this.dialog.open(ModalComponent, { data: { type: "addAppointment", clinic: this.clinic, workingHours: this.workingHours, doctors: this.doctors }, width: '600px' });
      dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.appointmentsService.makeAppointment({ userId: this.currentUserId, clinicId: this.clinic._id, date: formattedDate, ...response }).subscribe(res => {
            console.log(res);
          })
        }
      })
    }
  }
}
