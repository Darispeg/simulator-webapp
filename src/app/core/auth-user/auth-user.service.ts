import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthUser } from 'app/core/auth-user/auth-user.types';

@Injectable({
    providedIn: 'root'
})
export class AuthUserService
{
    private _user: ReplaySubject<AuthUser> = new ReplaySubject<AuthUser>(1);

    constructor(private _httpClient: HttpClient){}

    set user(value: AuthUser)
    {
        this._user.next(value);
    }

    get user$(): Observable<AuthUser>
    {
        return this._user.asObservable();
    }

    /**
     * Get the current logged in user data
     */
    get(): Observable<AuthUser>
    {
        return this._httpClient.get<AuthUser>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    update(user: AuthUser): Observable<any>
    {
        return this._httpClient.patch<AuthUser>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
