import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Vehicle } from '../../interface/vehicle.interface';
import { VehiclesService } from '../../services/vehicles.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    TableModule, 
    InputTextModule, 
    ButtonModule, 
    CalendarModule, 
    RouterModule,
    ToastModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  providers: [
    MessageService,
  ]
})
export class VehiclesComponent implements OnInit {

  loading = false;
  vehicles: Vehicle[] = [];
  router = inject(Router)
  private _vS = inject(VehiclesService)

  constructor(
    private messageService: MessageService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }
  
  async loadData() {
    this.loading = true;
    try {
      const { vehicles } = await lastValueFrom(this._vS.getAll());
      this.vehicles = vehicles;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteVehicle(id: string) {
    await lastValueFrom(this._vS.remove(id));
    this.showMessage('El vehículo fue eliminado', '');
    await this.loadData();
  }

  showMessage(detail: string, summary: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/auth')
  }

}
