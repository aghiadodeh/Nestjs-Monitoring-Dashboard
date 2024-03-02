import { Injectable } from "@angular/core";
import { CommonHttpService } from "@x-angular/cms";
import { Observable, map, tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthenticationService extends CommonHttpService {
    constructor() {
        super(`${environment.API_URL}/monitoring/authentication`)
    }

    public login(credentials: { username: string, password: string }): Observable<string> {
        return this.post<string>('login', credentials).pipe(
            map(response => response.data),
        );
    }
}