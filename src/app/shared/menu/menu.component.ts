import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('active') active: number;
  public user: any;
  public profileRoute: string;

  constructor(public localStorageService: LocalStorageService,
    public userService: UsersService,
    public router: Router) { }

  ngOnInit(): void {
    this.user = this.localStorageService.getUser();
    if (this.user) {
      if (this.localStorageService.getUserType() == 'clinic') {
        this.profileRoute = `/clinic/profile/${this.user._id}`;
      }
      else if (this.localStorageService.getUserType() == 'doctor') {
        this.profileRoute = `/doctors/profile/${this.user._id}`;
      }
      else {
        this.profileRoute = `/patient/profile/${this.user._id}`;
      }
    }
  }

  public logout(): void {
    this.userService.getLogout();
    if (this.router.url == "/home") {
      location.reload();
    }
    this.router.navigateByUrl("/home");

  }
}
