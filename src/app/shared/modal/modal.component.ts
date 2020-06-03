import { Component, OnInit, Inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorRegisterModel, DoctorModel } from '../models/doctor';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public type: string;
  public addDoctorForm: FormGroup;
  public AppointmentForm: FormGroup;
  public filteredDoctors: DoctorModel[];
  constructor(private localStorageService: LocalStorageService,
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
    this.AppointmentForm = this.formBuilder.group({
      type: ['', Validators.required],
      hour: ['', Validators.required],
      field: ['', Validators.required],
      doctorId: ['', Validators.required]
    });

  }
  public onSubmit(): void {
    switch (this.data.type) {
      case "addDoctor":
        if (this.addDoctorForm.valid) {
          let doctor: DoctorRegisterModel = this.addDoctorForm.value;
          this.dialogRef.close(doctor);
        }
        break;
      case "addAppointment":
        if (this.AppointmentForm.valid) {
          let appointment: any = this.AppointmentForm.value;
          this.dialogRef.close(appointment);
        }
    }
  }
  public filterDoctors(field?: string): DoctorModel[] {
    let doctors = this.data.doctors.filter((value: DoctorModel, index: number, doctors: DoctorModel[]) => {
      console.log(value.fields.includes(field));
      return value.fields.includes(field);
    });
    return field ? doctors : this.data.doctors;
  }
  public changeField(event) {
    this.filteredDoctors = this.filterDoctors(event.value);
  }

}
