import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormBase } from '../../bases/form.base';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends FormBase implements OnInit {

  private _aS = inject(AuthService)
  loading = false;

  constructor() {
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
    if (this.parentForm.invalid) return;
    this.loading = true;
    try {
      const user = this.parentForm.value;
      await lastValueFrom(this._aS.login(user));
      this.router.navigate(['vehicles']);
    } catch (error) {
      console.log(error);
    }
  }

}
