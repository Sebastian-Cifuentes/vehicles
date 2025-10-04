import { Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

export const PRIVATE_ROUTES: Routes = [
    {
        path: 'vehicles-form',
        loadComponent: () =>
            import('./vehicle-form/vehicle-form.component').then(
              (m) => m.VehicleFormComponent
            ),
    },
    {
        path: 'vehicles',
        loadComponent: () =>
            import('./vehicles/vehicles.component').then(
              (m) => m.VehiclesComponent
            ),
    },
    {
        path: 'vehicles-form/:id',
        loadComponent: () =>
          import('./vehicle-form/vehicle-form.component').then(
            (m) => m.VehicleFormComponent
          ),
    },
    {
        path: '**',
        redirectTo: 'vehicles'
    }
];
