import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const _sS = inject(SessionStorageService);
  const token = _sS.getToken();

  if (token) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};
