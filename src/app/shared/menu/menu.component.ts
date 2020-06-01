import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('active') active: number;
  public user: any;
  public profileRoute: string;

  constructor(public localStorageService: LocalStorageService, public userService: UsersService) { }

  ngOnInit(): void {
    this.user = this.localStorageService.getUser();

    if (this.localStorageService.getUserType() == 'clinic') {
      this.profileRoute = `/clinic/profile/${this.user._id}`;
    }
    else {
      this.profileRoute = `/patient/profile/${this.user._id}`;
    }
  }

  public logout(): void {
    this.userService.getLogout();
    location.reload();
  }
}
