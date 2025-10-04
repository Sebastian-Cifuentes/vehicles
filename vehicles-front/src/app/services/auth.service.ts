import { inject, Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { SessionStorageService } from './sessionStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private _sS = inject(SessionStorageService);

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  create(user: User): Observable<User> {
    return this.post<User>('auth/register', user)
      .pipe(
        map(user => {
          this._sS.setToken(user.token);
          delete user.token;
          return user;
        })
      )
  }

  login(user: User): Observable<User> {
    return this.post<User>('auth/login', user)
      .pipe(
        map(user => {
          this._sS.setToken(user.token);
          delete user.token;
          return user;
        })
      )
  }

}
