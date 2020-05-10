import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { UserRegisterModel } from '../user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public register: boolean = false;
  public registerAsUser: boolean = true;
  public registerAsClinic: boolean = false;
  constructor(public formBuilder: FormBuilder, private userService: UsersService, public localStorageService: LocalStorageService, public router: Router) { }

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
    })
  }
  public registerUser() {
    if (this.registerForm.valid) {
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
  }
  public getLogin() {
    this.userService.getLogin({ email: this.loginForm.controls["email"].value, password: this.loginForm.controls["password"].value }).subscribe(res => {
      this.localStorageService.setToken(res);
      // this.router.navigateByUrl("/home");
    })
  }
}
