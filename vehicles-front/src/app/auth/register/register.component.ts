import { Component, inject, OnInit } from '@angular/core';
import { FormBase } from '../../bases/form.base';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [
    MessageService,
  ]
})
export class RegisterComponent extends FormBase implements OnInit {

    private _aS = inject(AuthService)
    loading = false;

    constructor(
              private messageService: MessageService,
    ) {
      super();
    }
  
    ngOnInit(): void {
      this.init();
    }
  
    init() {
      const form = this.buildForm();
      this.setForm(form);
    }
  
    private buildForm(): FormGroup {
      return new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), Validators.required, Validators.minLength(6)])
      })
    }

    async onSubmit() {
      if (this.parentForm.invalid) return;
      this.loading = true;
      try {
        const user = this.parentForm.value;
        await lastValueFrom(this._aS.create(user))
        this.router.navigate(['vehicles'])
      } catch (error) {
        this.loading = false;
        this.showMessage('Correo o nombre de usuario ya existen', '', 'error')
        console.log(error);
      }
    }

    showMessage(detail: string, summary: string, severity: string) {
      this.messageService.add({ severity: severity, summary, detail });
    }

}
