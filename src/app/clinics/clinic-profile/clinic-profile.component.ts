import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ClinicsService } from '../clinics.service';
import { ClinicUpdateModel } from '../clinics.model';
import { ActivatedRoute } from '@angular/router';
import { AppointmentDisplayModel, AppointmentShortModel } from 'src/app/shared/models/appointment.model';
import { AppoinmentService } from 'src/app/shared/services/appoinment.service';
import { DoctorModel } from 'src/app/shared/models/doctor';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { faPlus, faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import * as moment from 'moment';
import { ReviewService } from 'src/app/shared/services/reviews.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-clinic-profile',
  templateUrl: './clinic-profile.component.html',
  styleUrls: ['./clinic-profile.component.scss']
})
export class ClinicProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  public moment = moment;
  public currentUserId: string;
  public currentUserType: String;
  public clinic: any;
  public appointments: AppointmentDisplayModel[] | AppointmentShortModel[];
  public doctors: DoctorModel[];
  public filteredDoctors: DoctorModel[];
  public reviews: any[];
  public sideNavButtons: string[];
  public activeButtons: boolean[];
  public selectedDateAppointments: AppointmentDisplayModel[];
  public startHour: number;
  public endHour: number;
  public workingHours: string[] = [];
  public doctorFields: boolean[];
  public faPlus = faPlus;
  public addReviewStars: { hovered: number, set: number | false } = { hovered: 0, set: false };
  public reviewText: string;
  public reviewPage: number = 0;
  public reviewPageSize: number = 10;
  public totalItems: number;
  public isAllowedToReview: boolean = false;
  public faStar = faStar;
  public isUpdating: boolean = false;
  //Update controld
  public descriptionControl = new FormControl('');
  public numberControl = new FormControl('');
  public startHourControl = new FormControl('');
  public endHourControl = new FormControl('');
  public startDayControl = new FormControl('');
  public endDayControl = new FormControl('');

  constructor(public localStorageService: LocalStorageService,
    public clinicService: ClinicsService,
    private route: ActivatedRoute,
    private appointmentsService: AppoinmentService,
    private doctorService: DoctorService,
    private reviewService: ReviewService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUserId = this.localStorageService.getUser() ? this.localStorageService.getUser()._id : undefined;
    this.currentUserType = this.localStorageService.getUserType();
    this.sideNavButtons = this.currentUserId ? ["Details", "Doctors", "Schedule", "Reviews"] : ["Details", "Doctors"]
    this.route.params.subscribe(params => {
      this.getClinic(params.id);
      this.getReviews(params.id);
      this.checkIfAllowedToReview(params.id);
    });
  }
  public getReviews(id: string) {
    this.reviewService.getClinicReviews(id, this.reviewPageSize, this.reviewPage).subscribe(response => {
      this.reviews = response.reviews;
      this.totalItems = response.count;
    }, (error) => {
      this.openSnackBar(error.error, "error");
    })
  }
  public checkIfAllowedToReview(id: string) {
    if (this.currentUserType == 'patient') {
      this.appointmentsService.getPatientAppointments(this.currentUserId, '' as any, id).subscribe(response => {
        if (response && response.length > 0) {
          this.isAllowedToReview = true;
        }
      }, (error) => {
        this.openSnackBar(error.error, "error");
      })
    }
  }
  public getClinic(id: string): void {
    this.clinicService.getClinic(id).subscribe(clinic => {
      this.clinic = clinic;
      this.doctorFields = new Array(clinic.fields.length + 1).fill(false);
      this.doctorFields[0] = true;
      this.startHour = this.formatHour(this.clinic.workingHours[0]);
      this.endHour = this.formatHour(this.clinic.workingHours[1]);
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
      }, (error) => {
        this.openSnackBar(error.error, "error");
      });
      this.doctorService.getClinicDoctors(this.clinic._id).subscribe(response => {
        this.doctors = response;
        this.toggleField(0, this.clinic.fields[0])
      }, (error) => {
        this.openSnackBar(error.error, "error");
      })
    });
  }
  public formatHour(hour: string): number {
    return parseInt(hour.substr(0, 2));
  }
  public hourToString(hour: number): string {
    let stringHour: string;
    if (hour < 10) {
      stringHour = ("0" + hour + ":00")
    }
    else {
      stringHour = (hour + ":00");
    }
    return stringHour;
  }
  public onEditClick(): void {
    this.isUpdating = true;
    this.descriptionControl.setValue(this.clinic.description);
    this.numberControl.setValue(this.clinic.number);
    this.startHourControl.setValue(this.startHour);
    this.endHourControl.setValue(this.endHour);
    this.startDayControl.setValue(this.clinic.workingDays[0]);
    this.endDayControl.setValue(this.clinic.workingDays[1]);
  }
  public updateClinic() {
    if (!this.startHourControl.valid || !this.endHourControl.valid || !this.descriptionControl.valid || !this.numberControl.valid) {
      this.openSnackBar("Invalid values in the form", "error");
    }
    else {
      let updatedDetails: ClinicUpdateModel = {
        id: this.clinic._id,
        description: this.descriptionControl.value,
        number: this.numberControl.value,
        workingHours: [this.hourToString(this.startHourControl.value),
        this.hourToString(this.endHourControl.value)],
        workingDays: [this.startDayControl.value, this.endDayControl.value]
      }
      this.clinicService.updateClinic(updatedDetails).subscribe(response => {
        this.clinic = response;
        this.openSnackBar("Clinic updated successfuly", "success");
        this.isUpdating = false;
      }, (error) => {
        this.openSnackBar(error.error, "error");
      }
      )
    }
  }

  public clickSideNav(event) {
    this.activeButtons = event;
  }
  public clickCalendar(event) {
    switch (this.currentUserType) {
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
      if (response) {
        this.doctorService.addDoctor({ clinicId: this.clinic._id, ...response }).subscribe(res => {
          this.getClinic(this.clinic._id);
          this.openSnackBar("Doctor added successfully", "success");
        }, (error) => {
          this.openSnackBar(error.error, "error");
        })
      }
    })
  }
  public openAppointmentDialog(date: Date) {
    if (this.currentUserId) {
      let formattedDate = moment(date).format('YYYY-MM-DD');
      let dialogRef = this.dialog.open(ModalComponent, { data: { type: "addAppointment", clinic: this.clinic, workingHours: this.workingHours, doctors: this.doctors }, width: '600px' });
      dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.appointmentsService.makeAppointment({ userId: this.currentUserId, clinicId: this.clinic._id, date: formattedDate, ...response }).subscribe(res => {
            this.openSnackBar("Appointment added successfully", "success");
            this.appointmentsService.getClinicAppointments(this.clinic._id).subscribe(app => {
              this.appointments = app;
            });
          }, (error) => {
            this.openSnackBar(error.error, "error");
          })
        }
      })
    }
  }

  public countStars(stars: number): IconDefinition[] {
    let starArray: IconDefinition[] = [];
    for (let i = 0; i <= stars - 1; i++) {
      starArray.push(faStar);
    }
    while (starArray.length < 5) {
      starArray.push(faEmptyStar);
    }
    return starArray;
  }

  public submitReview(): void {
    let review = { userId: this.currentUserId, clinicId: this.clinic._id, description: this.reviewText, stars: this.addReviewStars.set }

    if (this.addReviewStars.set) {
      this.reviewService.makeReview(review).subscribe(response => {
        this.addReviewStars = { hovered: 0, set: false };
        this.getReviews(this.clinic._id);
        this.getClinic(this.clinic._id);
        this.reviewText = '';
      });
    }
  }
  public changePage(event) {
    this.reviewPage = event;
    this.getReviews(this.clinic._id);
  }
  public openSnackBar(message: string, type: string) {
    this.snackBar.open(message, "Close", { duration: 2000, panelClass: [type == 'success' ? "green-snack-bar" : "red-snack-bar"] });
  }

  public openFileDialog() {
    this.fileInput.nativeElement.click();
    console.log(this.fileInput)
  }
  public changeProfile(event) {

    let getExtension = (file: File) => {
      const lastDot = file.name.lastIndexOf('.');
      const extension = file.name.substring(lastDot + 1);
      return extension;
    }
    let file: File = event.target.files[0];
    if (!["jpg", "png", "jpeg"].includes(getExtension(file))) {
      console.log(["jpg", "png", "jpeg"].includes(getExtension(file)))
      this.openSnackBar("Extension not allowed", "error");
    }
    else if (event.target.files && file) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.clinic.profileImage = event.target["result"] as string;
        this.clinicService.uploadProfile(this.clinic.profileImage, this.clinic._id).subscribe(res => {
          console.log(res);
        })

      }
    }
  }

}
