import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { UserRegisterModel, ClinicRegisterModel } from '../user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { locations } from '../../../assets/locations';
import * as _ from 'lodash';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public registerClinicForm: FormGroup;
  public register: boolean = false;
  public registerAsUser: boolean = true;
  public registerAsClinic: boolean = false;
  public counties: any[];
  public cities: any[] = [];
  constructor(public formBuilder: FormBuilder,
    private userService: UsersService,
    public localStorageService: LocalStorageService,
    public router: Router,
    public utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: this.utilsService.customPosswordMatchValidator });
    this.registerClinicForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      county: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: this.utilsService.customPosswordMatchValidator });
    this.counties = locations.states;

  }
  public registerUser() {
    if (this.registerForm.valid && this.registerAsUser == true) {
      let user: UserRegisterModel = new UserRegisterModel(this.registerForm.controls["email"].value,
        this.registerForm.controls["firstName"].value,
        this.registerForm.controls["lastName"].value,
        this.registerForm.controls["password"].value,
        this.registerForm.controls["repeatPassword"].value
      )
      this.userService.registerUser(user).subscribe(res => {
        this.register = false;
      })
    }
    else if (this.registerClinicForm.valid && !this.registerAsUser) {
      let clinic: ClinicRegisterModel = new ClinicRegisterModel(this.registerClinicForm.controls["email"].value, this.registerClinicForm.controls["name"].value,
        _.pick(this.registerClinicForm.controls["county"].value, ["id", "name", "state_code"]), _.pick(this.registerClinicForm.controls["city"].value, ["id", "name"]), this.registerClinicForm.controls["password"].value, this.registerClinicForm.controls["repeatPassword"].value)
      this.userService.registerClinic(clinic).subscribe(res => { this.register = false; })
    }
  }
  public getLogin() {
    this.userService.getLogin({ email: this.loginForm.controls["email"].value, password: this.loginForm.controls["password"].value }).subscribe(res => {
      this.localStorageService.setToken(res);
      this.router.navigateByUrl("/home");
    })
  }

  public showCities() {
    console.log(this.registerClinicForm.controls["county"].value)
    let { id } = this.registerClinicForm.controls["county"].value;
    let county = this.counties.find(county => county.id == id);
    console.log(county)
    if (county) this.cities = county.cities;

  }
}
