import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

    getToken(): string | null {
        return sessionStorage.getItem('token') ?? null
    }

    setToken(token: string = '') {
        sessionStorage.setItem('token', token);
    }

}
