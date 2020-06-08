import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { DoctorModel } from 'src/app/shared/models/doctor';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AppoinmentService } from 'src/app/shared/services/appoinment.service';
import { AppointmentModel, AppointmentDisplayModel, AppointmentResult } from 'src/app/shared/models/appointment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { DoctorUpdateModel } from '../doctor.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit, OnDestroy {
  public doctor: DoctorModel;
  public sideNavButtons: string[] = ["Details"];
  public activeButtons: boolean[];
  public currentUserId: string;
  public currentUserType: string;
  public appointments: AppointmentDisplayModel[];
  public patients: any[];
  public isUpdating: boolean = false;
  public fields: string[];
  public selectedDateAppointments: AppointmentDisplayModel[];
  public hours: string[] = [];
  public selectedPatient: string = '';
  public selectedPatientAppointments: AppointmentDisplayModel[];
  //Update controld
  public numberControl = new FormControl('');
  public fieldsControl = new FormControl('');
  //Icons
  chevronDown = faChevronDown;
  chevronUp = faChevronUp;
  //
  public subscriptions: Subscription[] = [];

  constructor(private doctorsService: DoctorService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private appointmentsService: AppoinmentService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUserId = this.localStorageService.getUser() ? this.localStorageService.getUser()._id : undefined;
    this.currentUserType = this.localStorageService.getUserType();
    console.log(this.route);
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.doctorsService.getDoctor(params.id).subscribe(doctor => {
        console.log("here")
        this.doctor = doctor;
        (this.currentUserId == this.doctor._id) ? this.sideNavButtons = ["Details", "Schedule", "My Patients"] : null;
        this.getAppointments(this.doctor._id);
        this.getPatients(this.doctor._id);
      }, (error) => {
        this.openSnackBar(error.error, "error");
      })
    }));
    this.createHoursArray();

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  public getAppointments(id: string, date?: Date): void {
    this.appointmentsService.getDoctorAppointments(id, date).subscribe(app => {
      this.appointments = app;
    }, (error) => {
      this.openSnackBar(error.error, "error");
    });
  }
  public getPatients(id: string): void {
    this.doctorsService.getPatients(id).subscribe(patients => {
      this.patients = patients;
    });
  }
  public clickSideNav(event) {
    this.activeButtons = event;
  }
  public onEditClick(): void {
    this.isUpdating = true;
    this.numberControl.setValue(this.doctor.phone);
    this.fields = this.doctor.fields;
  }
  public updateDoctor() {
    let updatedDetails: DoctorUpdateModel = {
      id: this.doctor._id,
      phone: this.numberControl.value,
      fields: this.fields
    }
    this.doctorsService.updateDoctor(updatedDetails).subscribe(response => {
      this.doctor = response;
      this.openSnackBar("Profile updated successfuly", "success");
      this.isUpdating = false;
    }, (error) => {
      this.openSnackBar(error.error, "error");
    });
  }
  public removeField(index: number): void {
    this.fields.splice(index, 1);
    console.log(index)
  }
  public addField(event): void {
    this.fields.push(event.target.value);
    this.fieldsControl.setValue('');
  }
  public clickCalendar(event) {
    this.appointmentsService.getDoctorAppointments(this.doctor._id, event).subscribe(res => {
      this.selectedDateAppointments = res;
      this.selectedDateAppointments.sort((a: AppointmentDisplayModel, b: AppointmentDisplayModel) => {
        return (a.hour > b.hour) ? 1 : -1;
      })
      console.log(this.selectedDateAppointments)
    }, error => {
      this.openSnackBar(error.error, "error");
    });

  }
  public createHoursArray() {
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
  public openSnackBar(message: string, type: string) {
    this.snackBar.open(message, "Close", { duration: 2000, panelClass: [type == 'success' ? "green-snack-bar" : "red-snack-bar"] });
  }
  public setResult(appointment: AppointmentDisplayModel): void {
    let dialogRef = this.dialog.open(ModalComponent, { data: { type: "addResult", appointment: appointment }, width: "600px" });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let result: AppointmentResult = { diagnosis: response.diagnosis, prescription: response.prescription }
        this.appointmentsService.setAppointmentResult(result, appointment._id).subscribe(res => {
          if (res) {
            this.openSnackBar("Result saved successfully", "success");
          }
          this.clickCalendar(res.date);
          if (this.selectedPatient) {
            this.getSelectedPatientAppointments(this.selectedPatient);
          }
          this.expandPatient
        }, (error) => {
          this.openSnackBar(error.error, "error");
        })
      }
    })
  }
  public getSelectedPatientAppointments(id: string): void {
    this.appointmentsService.getPatientAppointments(id, null, '', this.doctor._id).subscribe(appointments => {
      this.selectedPatientAppointments = appointments;
    }, (error) => {
      this.openSnackBar(error.error, "error");
    })
  }
  public expandPatient(id: string): void {
    if (this.selectedPatient == id) {
      this.selectedPatient = '';
    }
    else {
      this.selectedPatient = id;
      this.getSelectedPatientAppointments(id);

    }
  }

}
