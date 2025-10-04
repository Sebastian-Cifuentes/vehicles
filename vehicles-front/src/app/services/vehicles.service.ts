import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Vehicle } from '../interface/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends ApiService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.post<Vehicle>('vehicles', vehicle);
  }

  update(vehicle: Vehicle, id: string): Observable<Vehicle> {
    return this.patch<Vehicle>(`vehicles/${id}`, vehicle);
  }

  remove(id: string): Observable<void> {
    return this.delete(`vehicles/${id}`);
  }

  getOne(id: string): Observable<Vehicle> {
    return this.get<Vehicle>(`vehicles/${id}`);
  }

  getAll(): Observable<{vehicles: Vehicle[]}> {
    return this.get<{vehicles: Vehicle[]}>('vehicles');
  }
}
