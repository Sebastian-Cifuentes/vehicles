import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) 
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./private/private.routes').then(m => m.PRIVATE_ROUTES) 
    },
    {
        path: '**',
        redirectTo: ''
    }
];
