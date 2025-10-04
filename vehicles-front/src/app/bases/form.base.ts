import { AbstractControl, FormGroup } from "@angular/forms";
import { Directive, Inject, inject, Input } from "@angular/core";
import { IFormBase } from "../interface/form-base.interface";
import { FormErrorService } from "../services/form-error.service";
import { Router } from "@angular/router";

export abstract class FormBase implements IFormBase {

    router = inject(Router)
    parentForm!: FormGroup;
    formErrorService = inject(FormErrorService);

    constructor(
    ) {}

    load(form: FormGroup) {
        this.parentForm = form;
    }

    setForm(form: FormGroup) {
        this.parentForm = form;
    }

    getControl(control: string): AbstractControl {
      return this.parentForm.get(control)!;
    }
    
    getError(control: string): boolean {
      return this.getControl(control)!.invalid && this.getControl(control)!.touched;
    }
  
    getErrorMessage(control: string): string[] {
      if (this.getError(control)) {
        return this.formErrorService.mapErrors(this.getControl(control)!);
      }
      return [];
    }

}