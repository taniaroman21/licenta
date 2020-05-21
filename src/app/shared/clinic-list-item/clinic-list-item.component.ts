import { Component, OnInit, Input } from '@angular/core';
import { ClinicListItem } from '../../clinics/clinics.model';

@Component({
  selector: 'app-clinic-list-item',
  templateUrl: './clinic-list-item.component.html',
  styleUrls: ['./clinic-list-item.component.scss']
})
export class ClinicListItemComponent implements OnInit {
  @Input('clinic') clinic: ClinicListItem;
  constructor() { }

  ngOnInit(): void {
    console.log(this.clinic)
  }

}
