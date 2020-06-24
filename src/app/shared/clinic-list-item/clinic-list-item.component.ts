import { Component, OnInit, Input } from '@angular/core';
import { ClinicListItem } from '../../clinics/clinics.model';
import { faStar, faMapMarker, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clinic-list-item',
  templateUrl: './clinic-list-item.component.html',
  styleUrls: ['./clinic-list-item.component.scss']
})
export class ClinicListItemComponent implements OnInit {
  @Input('clinic') clinic: ClinicListItem;
  faStar = faStar;
  locationIcon = faMapMarkerAlt;
  constructor() { }

  ngOnInit(): void {
    console.log(this.clinic)
  }

}
