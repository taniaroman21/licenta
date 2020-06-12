import { Component, OnInit } from '@angular/core';
import { ClinicsService } from '../clinics/clinics.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public clinics: any[];
  public page: number = 0;
  public pageSize: number = 4;
  public totalItems: number;
  public faSearch = faSearch;
  public filterValue: string = '';
  constructor(public clinicService: ClinicsService) { }

  ngOnInit() {
    this.getClinics();
  }
  public getClinics(): void {
    this.clinicService.getClinics(this.pageSize, this.page, this.filterValue).subscribe(response => {
      this.clinics = response.clinics;
      this.totalItems = response.count;
    })
  }

  public searchClinic(event) {
    this.filterValue = event.target.value;
    this.getClinics();
  }
  public changePage(event) {
    this.page = event;
    this.getClinics();
  }

}
