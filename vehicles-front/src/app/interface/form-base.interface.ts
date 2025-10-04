import { AbstractControl, FormGroup } from "@angular/forms";
import { FormErrorService } from "../services/form-error.service";

export interface IFormBase {
    parentForm: FormGroup;
    formErrorService: FormErrorService,
    load: (form: FormGroup) => void,
    getControl: (control: string) => AbstractControl,
    getError: (control: string) => boolean,
    getErrorMessage: (control: string) => string[],
    setForm: (form: FormGroup) => void,
}