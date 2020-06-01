import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ClinicsService } from '../clinics.service';
import { ClinicUpdateModel } from '../clinics.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AppointmentDisplayModel } from 'src/app/shared/models/appointment.model';
import { AppoinmentService } from 'src/app/shared/services/appoinment.service';
import { DoctorModel } from 'src/app/shared/models/doctor';

@Component({
  selector: 'app-clinic-profile',
  templateUrl: './clinic-profile.component.html',
  styleUrls: ['./clinic-profile.component.scss']
})
export class ClinicProfileComponent implements OnInit {
  public clinic: any;
  public appointments: AppointmentDisplayModel[];
  public doctors: DoctorModel[];
  public sideNavButtons: string[] = ["Details", "Doctors", "Schedule"];
  public activeButtons: boolean[];
  public selectedDateAppointments: AppointmentDisplayModel[];
  public startHour: number;
  public endHour: number;
  public workingHours: string[] = [];
  constructor(public localStorageService: LocalStorageService, public clinicService: ClinicsService, private route: ActivatedRoute, private appointmentsService: AppoinmentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.clinicService.getClinic(params.id).subscribe(clinic => {
        this.clinic = clinic;
        this.startHour = parseInt(this.clinic.workingHours[0].substr(0, 2));
        this.endHour = parseInt(this.clinic.workingHours[1].substr(0, 2));
        for (let i = this.startHour; i <= this.endHour; i++) {
          if (i < 10) {
            this.workingHours.push("0" + i + ":00");
          }
          else {
            this.workingHours.push(i + ":00");
          }
        }
        console.log(this.startHour, this.endHour);
        this.appointmentsService.getClinicAppointments(this.clinic._id).subscribe(app => {
          this.appointments = app;
        })
      }));
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
    console.log(event);
    this.appointmentsService.getClinicAppointments(this.clinic._id, event).subscribe(res => {
      this.selectedDateAppointments = res;
      this.selectedDateAppointments.sort((a: AppointmentDisplayModel, b: AppointmentDisplayModel) => {
        return (a.hour > b.hour) ? 1 : -1;
      })
      console.log(this.selectedDateAppointments)
    })
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
}
