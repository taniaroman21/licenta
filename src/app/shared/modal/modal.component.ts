import { Component, OnInit, Inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorRegisterModel, DoctorModel } from '../models/doctor';
import { AppointmentResult } from '../models/appointment.model';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public type: string;
  public addDoctorForm: FormGroup;
  public appointmentForm: FormGroup;
  public resultForm: FormGroup;
  public filteredDoctors: DoctorModel[];
  public doctorExists: boolean = false;
  public existingDoctor: DoctorModel;
  closeIcon = faTimes;
  constructor(private localStorageService: LocalStorageService,
    public doctorService: DoctorService,
    public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ModalComponent>) {
    this.type = this.data.type;
    console.log(this.type);
  }

  ngOnInit(): void {
    this.addDoctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      field: ['', Validators.required]
    });
    this.appointmentForm = this.formBuilder.group({
      type: ['', Validators.required],
      hour: ['', Validators.required],
      field: ['', Validators.required],
      doctorId: ['', Validators.required]
    });
    this.resultForm = this.formBuilder.group({
      diagnosis: [this.data.appointment && this.data.appointment.result ? this.data.appointment.result.diagnosis : '', Validators.required],
      prescription: [this.data.appointment && this.data.appointment.result ? this.data.appointment.result.prescription : '', Validators.required]
    })

  }
  public onSubmit(): void {
    switch (this.data.type) {
      case "addDoctor":
        if (this.addDoctorForm.valid) {
          if (this.existingDoctor) this.addDoctorForm.controls['password'].setValue(" ");
          let doctor: DoctorRegisterModel = this.addDoctorForm.getRawValue();
          this.dialogRef.close(doctor);
        }
        break;
      case "addAppointment":
        if (this.appointmentForm.valid) {
          let appointment: any = this.appointmentForm.value;
          this.dialogRef.close(appointment);
        }
        break;
      case "addResult":
        if (this.resultForm.valid) {
          let result: AppointmentResult = this.resultForm.value;
          this.dialogRef.close(result);
        }
        break;
    }
  }
  public filterDoctors(field?: string): DoctorModel[] {
    let doctors = this.data.doctors.filter((value: DoctorModel, index: number, doctors: DoctorModel[]) => {
      console.log(value.fields.includes(field));
      return value.fields.includes(field);
    });
    return field ? doctors : this.data.doctors;
  }
  public findDoctor(event): void {
    if (event.target.value) {
      this.doctorService.getDoctor(event.target.value).subscribe(response => {
        if (response && response.length > 0) {
          this.existingDoctor = response[0];
          this.addDoctorForm.controls['firstName'].setValue(response[0].firstName);
          this.addDoctorForm.controls['lastName'].setValue(response[0].lastName);
          this.addDoctorForm.controls['password'].disable();
          this.addDoctorForm.controls['firstName'].disable();
          this.addDoctorForm.controls['lastName'].disable();

        } else {
          this.addDoctorForm.controls['password'].enable();
          this.existingDoctor = undefined;
        }
      });
    }
  }
  public changeField(event) {
    this.filteredDoctors = this.filterDoctors(event.value);
  }
  public formatDate(date: Date) {
    return new Date(date).toDateString();
  }

}
