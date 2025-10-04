import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from '../services/sessionStorage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _sS = inject(SessionStorageService);
  const token = _sS.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
