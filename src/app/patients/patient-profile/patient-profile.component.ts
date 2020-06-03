import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { AppointmentDisplayModel } from 'src/app/shared/models/appointment.model';
import { AppoinmentService } from 'src/app/shared/services/appoinment.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  public sideNavButtons: string[] = ["Details", "My Appointments"];
  public activeButtons: boolean[];
  public patient: any;
  public appointments: AppointmentDisplayModel[];
  public selectedDateAppointments: AppointmentDisplayModel[];
  public hours: string[] = [];
  constructor(public localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private appointmentsService: AppoinmentService, ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientService.getPatient(params.id).subscribe(patient => {
        this.patient = patient;
        this.appointmentsService.getPatientAppointments(this.patient._id).subscribe(res => {
          this.appointments = res;
          console.log(this.appointments)
        })
      })
    });
    this.hours = [];
    for (let i = 8; i <= 20; i++) {
      if (i < 10) {
        this.hours.push("0" + i + ":00");
      }
      else {
        this.hours.push(i + ":00");
      }
    }
  }
  public clickSideNav(event) {
    this.activeButtons = event;
  }
  public clickCalendar(event) {

    this.appointmentsService.getPatientAppointments(this.patient._id, event).subscribe(res => {
      this.selectedDateAppointments = res;
      this.selectedDateAppointments.sort((a: AppointmentDisplayModel, b: AppointmentDisplayModel) => {
        return (a.hour > b.hour) ? 1 : -1;
      })
      console.log(this.selectedDateAppointments)
    })
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
