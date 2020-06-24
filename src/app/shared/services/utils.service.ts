import { Injectable } from '@angular/core';
import { FormGroup, AbstractFormGroupDirective, AbstractControl, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(public snackBar: MatSnackBar) { }

    public customPosswordMatchValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
        const match = form.get("password").value == form.get("repeatPassword").value ? true : false;

        return match ? null : { 'unmatch': true }

    }

    public redirectAccordingToRole(userType: string, userId: string): string {
        let route: string = '';
        switch (userType) {
            case 'patient':
                route = '/home';
                break;
            case 'clinic':
                route = `/clinic/profile/${userId}`;
                break;
            case 'doctor':
                route = `/doctor/profile/${userId}`;
            default:
                route = '/home';
                break;
        }
        return route;
    }
    public openSnackBar(message: string, type: string) {
        this.snackBar.open(message, "Close", { duration: 2000, panelClass: [type == 'success' ? "green-snack-bar" : "red-snack-bar"] });
    }
}