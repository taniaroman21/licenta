import { Component, OnInit } from '@angular/core';
import { DoctorModel } from 'src/app/shared/models/doctor';
import { DoctorService } from '../doctor.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {
  public doctors: DoctorModel[];
  public filteredDoctors: DoctorModel[];
  public page: number = 0;
  public pageSize: number = 4;
  public totalItems: number;
  public faSearch = faSearch;
  public filterValue: string = '';
  constructor(private doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  public getDoctors(): void {
    this.doctorsService.getDoctors(this.pageSize, this.page, this.filterValue).subscribe(response => {
      this.doctors = response.doctors;
      this.totalItems = response.count;
    })
  }

  public searchDoctor(event) {
    this.filterValue = event.target.value;
    this.getDoctors();
  }
  public changePage(event) {
    this.page = event;
    this.getDoctors();
  }
}
