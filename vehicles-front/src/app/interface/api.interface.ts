import { Observable } from "rxjs";

export interface IApiService {
    get: (path: string, options: { [param: string]: unknown }) => Observable<unknown>
}