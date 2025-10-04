import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormBase } from '../../bases/form.base';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    RouterModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    MessageService,
  ]
})
export class LoginComponent extends FormBase implements OnInit {

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
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/))
    })
  }

  async onSubmit() {
    this.loading = true;
    if (this.parentForm.invalid) return;
    try {
      const user = this.parentForm.value;
      await lastValueFrom(this._aS.login(user));
      this.showMessage('Ingresando al sistema', '', 'success')
      this.router.navigate(['vehicles']);
    } catch (error) {
      this.loading = false;
      this.showMessage('Credenciales invalidas', '', 'error')
      console.log(error);
    }
  }

  showMessage(detail: string, summary: string, severity: string) {
    this.messageService.add({ severity: severity, summary, detail });
  }

}
