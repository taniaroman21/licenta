import { Injectable } from '@angular/core';
import { FormGroup, AbstractFormGroupDirective, AbstractControl, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { UtilsService } from './utils.service';
import { ImageModel } from '../models/image.model';
import { Observable } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  public imageData: { file: string | ArrayBuffer, name: string, extension: string };

  constructor(public utilsService: UtilsService) { }

  public getExtension(file: File): string {
    const lastDot = file.name.lastIndexOf('.');
    const extension = file.name.substring(lastDot + 1);
    return extension;
  }
  public getName(file: File): string {
    const lastDot = file.name.lastIndexOf('.');
    const name = file.name.substring(0, lastDot);
    return name;
  }

  public getImageObject(file: File, base64: string | ArrayBuffer): { file: string | ArrayBuffer, name: string, extension: string } {
    const name: string = this.getName(file);
    const extension: string = this.getExtension(file);

    if (!["JPG", "PNG", "JPEG"].includes(this.getExtension(file).toUpperCase())) {
      throw new Error("Extension not allowed")
    }
    return { file: base64, name: name, extension: extension };

  }

  public getReader(file: File, func: (event) => void): void {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = func;
  }

}