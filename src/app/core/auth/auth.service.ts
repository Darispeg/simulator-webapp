import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { AuthUserService } from 'app/core/auth-user/auth-user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUser } from '../auth-user/auth-user.types';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient,
        private _userService: AuthUserService
    ){}

    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    signIn(credentials: { username: string; password: string }): Observable<any>
    {
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.AuthUrl}`, credentials, {
            observe: 'response'
        })
        .pipe(
            map((response: HttpResponse<any>) => {
                const body = response.body;
                const headers = response.headers;

                const bearerToken = headers.get('Authorization')!;
                const token = bearerToken.replace('Bearer ', '');
                this.accessToken = token;
                this._authenticated = true;
 
                localStorage.setItem('accessToken', token);
                
                this.mappingUser(token);
                return body;
            })
        );
    }

    mappingUser(token: string){
        const helper = new JwtHelperService();
        const decoded = helper.decodeToken(token);

        const _user : AuthUser = {
            id : '',
            name: decoded.user.name,
            email: decoded.user.username,
            avatar : 'true',
            status: 'active',
            authorities: []
        };

        if (decoded.user.authorities != null && decoded.user.authorities.length){
            for (let index = 0; index < decoded.user.authorities.length; index++) {
                _user.authorities.push(decoded.user.authorities[index].authority); 
            }
        }
        this._userService.user = _user;
    }

    signInUsingToken(): Observable<any>
    {
        return this._httpClient.post(`${environment.APIurl}/auth/sign-up`, {
            accessToken: this.accessToken
        })
        .pipe(
            catchError(() =>
                of(false)
            ),
            map((response: HttpResponse<any>) => {
                const body = response.body;
                const headers = response.headers;

                const bearerToken = headers.get('Authorization')!;
                const token = bearerToken.replace('Bearer ', '');
                this.accessToken = token;
                this._authenticated = true;
                this.mappingUser(token);

                return of(true);
            })
        );
    }

    signOut(): Observable<any>
    {
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }

    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken || this.accessToken === "undefined" )
        {
            //this.signOut();
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
