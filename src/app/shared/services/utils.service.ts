import { Injectable } from '@angular/core';
import { FormGroup, AbstractFormGroupDirective, AbstractControl, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    public customPosswordMatchValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
        const match = form.get("password").value == form.get("repeatPassword").value ? true : false;

        return match ? null : { 'unmatch': true }

    }
}