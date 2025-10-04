import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBase } from '../../bases/form.base';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { VehicleType } from '../../interface/vehicle-type.interface';
import { vehicleTypes } from '../../utils/vehicles_type';
import { lastValueFrom } from 'rxjs';
import { VehiclesService } from '../../services/vehicles.service';
import { MessageService } from 'primeng/api';
import { Vehicle } from '../../interface/vehicle.interface';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
  providers: [
    MessageService,
  ]
})
export class VehicleFormComponent extends FormBase implements OnInit {

  @Input() id!: string | undefined;
  vehiclesTypes: VehicleType[] = vehicleTypes;
  loading = false;
  vehicle!: Vehicle;
  private _vS = inject(VehiclesService)

  constructor(
    private messageService: MessageService,
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.init();
  }

  async init() {
    this.loading = true;
    if (this.id) {
      try {
        const vehicle = await lastValueFrom(this._vS.getOne(this.id));
        this.vehicle = vehicle;
      } catch (error) {
        console.log(error);
      }
    }
    const form = this.buildForm();
    this.setForm(form);
    this.loading = false;
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name_owner: new FormControl(this.vehicle?.name_owner, Validators.required),
      email_owner: new FormControl(this.vehicle?.email_owner, [Validators.email, Validators.required]),
      number_owner: new FormControl(+this.vehicle?.number_owner, [Validators.required, Validators.minLength(3)]),
      plate: new FormControl(this.vehicle?.plate, [Validators.required, Validators.maxLength(10)]),
      type: new FormControl(this.vehicle?.type, Validators.required),
      model: new FormControl(+this.vehicle?.model, [Validators.required, Validators.maxLength(20)]),
      entry_date: new FormControl(this.vehicle?.entry_date ? this.setDate(this.vehicle.entry_date) : '', Validators.required),
      brand: new FormControl(this.vehicle?.brand, [Validators.required, Validators.maxLength(20)]),
    })
  }

  async onSubmit() {
    if (this.parentForm.invalid) return;
    this.loading = true;
    try {
      const vehicle: Vehicle = this.parentForm.value;
      if (this.id) {
        await lastValueFrom(this._vS.update(vehicle, this.id))
      } else {
        await lastValueFrom(this._vS.create(vehicle))
      }
      this.showMessage('Se creo el vehículo', '', 'success');
      this.router.navigate(['vehicles'])
    } catch (error) {
      this.loading = false;
      this.showMessage('Un vehículo con esta placa ya existe', '', 'error');
      console.log(error);
    }
  }

  showMessage(detail: string, summary: string, severity: string) {
    this.messageService.add({ severity: severity, summary, detail });
  }

  private setDate(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 24);
    return newDate;
  }

  back() {
    this.router.navigateByUrl('vehicles');
  }
}
