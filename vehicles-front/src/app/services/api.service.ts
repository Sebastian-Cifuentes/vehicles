import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

/** Environments */
import { environment } from '../../environments/environment';

/** Interfaces */
import { IApiService } from '../interface/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  private httpClient: HttpClient;
  protected apiUrl = environment.apiUrl;

  constructor(
    protected injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient)
  }

  get<T>(path: string, options: { [param: string]: unknown } = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}${path}`, options);
  }

  post<T>(path: string, body: unknown, options: { [param: string]: unknown } = {}): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}${path}`, body, options);
  }

  patch<T>(path: string, body: unknown, options: { [param: string]: unknown } = {}): Observable<T> {
    return this.httpClient.patch<T>(`${this.apiUrl}${path}`, body, options);
  }

  delete<T>(path: string, options: { [param: string]: unknown } = {}): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}${path}`, options);
  }
  
}