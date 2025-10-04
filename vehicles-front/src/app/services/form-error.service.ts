import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  errorMap: { [key: string]: (c: AbstractControl) => string } = {
    'required': (c: AbstractControl) => `Este campo es requerido`,
    'email': (c: AbstractControl) => `Debe ser un email válido.`,
    'pattern': (c: AbstractControl) => `Debe tener una mayuscula, una minuscula, y un número`,
    'minlength': (c: AbstractControl) => `El número de carácteres debe ser mayor a ${c.errors?.['minlength']?.requiredLength}`,
    'maxlength': (c: AbstractControl) => `El número de carácteres debe ser menor a ${c.errors?.['maxlength']?.requiredLength}`,
  }

  public mapErrors(control: AbstractControl): string[] {
    try {
      return Object.keys(control.errors || {})
        .map(key => this.errorMap[key](control));
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
