import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { AppointmentDisplayModel } from 'src/app/shared/models/appointment.model';
import { AppoinmentService } from 'src/app/shared/services/appoinment.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { ResourcesService } from 'src/app/shared/services/resources.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  public currentUserId: string;
  public sideNavButtons: any[];
  public activeButtons: boolean[];
  public patient: any;
  public appointments: AppointmentDisplayModel[];
  public selectedDateAppointments: AppointmentDisplayModel[];
  public hours: string[] = [];
  public isUpdating: boolean = false;
  //Update controld
  public numberControl = new FormControl('');
  //icons
  pencilIcon = faPencilAlt;
  saveIcon = faSave;

  public showSpinner: boolean = false;

  constructor(public localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private appointmentsService: AppoinmentService,
    public snackBar: MatSnackBar,
    public staticDataService: StaticDataService,
    public resourceService: ResourcesService) { }

  ngOnInit(): void {
    this.currentUserId = this.localStorageService.getUser() ? this.localStorageService.getUser()._id : undefined;
    this.route.params.subscribe(params => {
      this.sideNavButtons = this.staticDataService.getSideNiveItems(params.id, "patient");
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
  public formatDate(date: Date) {
    return new Date(date).toDateString();
  }
  public onEditClick(): void {
    this.isUpdating = true;
    this.numberControl.setValue(this.patient.phone);

  }
  public updatePatient() {
    let updatedDetails = {
      phone: this.numberControl.value,
    }
    this.patientService.updatePatient(updatedDetails, this.patient._id).subscribe(response => {
      this.patient = response;
      this.openSnackBar("Profile updated successfuly", "success");
      this.isUpdating = false;
    }, (error) => {
      this.openSnackBar(error.error, "error");
    });
  }
  public openSnackBar(message: string, type: string) {
    this.snackBar.open(message, "Close", { duration: 2000, panelClass: [type == 'success' ? "green-snack-bar" : "red-snack-bar"] });
  }
  public openFileDialog() {
    this.fileInput.nativeElement.click();
    console.log(this.fileInput)
  }
  public changeProfile(event) {
    this.showSpinner = true;
    const file = event.target.files[0];
    this.resourceService.getReader(file, (event) => {
      let base64 = event.target.result;
      let imageObject: {
        file: string | ArrayBuffer, name: string, extension: string
      } = this.resourceService.getImageObject(file, base64);
      this.patientService.uploadProfile(imageObject, this.patient._id).subscribe(res => {
        this.patient = res;
        this.showSpinner = false;
        if (this.currentUserId == this.patient._id) this.localStorageService.setUser(res)
      });

    })


  }


}
