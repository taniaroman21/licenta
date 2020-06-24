import { Injectable } from '@angular/core';
import { faCalendar, faAddressBook, faStar } from '@fortawesome/free-regular-svg-icons';
import { faUserMd, faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from './local-storage.service';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  public scheduleIcon = faCalendar;
  public doctorsIcon = faUserMd;
  public contactIcon = faAddressBook;
  public patientIcon = faUserInjured;
  public reviewIcon = faStar;

  constructor(private localStorageService: LocalStorageService) { }

  public getSideNiveItems(currentUserId: string, pageType: string) {
    const user = this.localStorageService.getUser();
    let menu = (): { text: string, icon: IconDefinition }[] => {
      switch (pageType) {
        case "clinic":
          if (user)
            return [{ text: "Details", icon: this.contactIcon }, { text: "Doctors", icon: this.doctorsIcon }, { text: "Schedule", icon: this.scheduleIcon }, { text: "Reviews", icon: this.reviewIcon }];
          else
            return [{ text: "Details", icon: this.contactIcon }, { text: "Doctors", icon: this.doctorsIcon }];
        case "patient":
          if (currentUserId === user._id)
            return [{ text: "Details", icon: this.contactIcon }, { text: "My Schedule", icon: this.scheduleIcon }];
          else
            return [{ text: "Details", icon: this.contactIcon }];
        case "doctor":
          if (user && currentUserId === user._id)
            return [{ text: "Details", icon: this.contactIcon }, { text: "My Schedule", icon: this.scheduleIcon }, { text: "My Patients", icon: this.patientIcon }];
          else
            return [{ text: "Details", icon: this.contactIcon }];

      }
    }
    return menu();
  }
}
