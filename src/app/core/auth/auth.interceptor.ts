import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private _authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let newReq = req.clone();

        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken),
            });
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    // Sign out
                    this._authService.signOut();

                    // Reload the app
                    location.reload();
                }
                else if (error instanceof HttpErrorResponse)
                {
                    this.getError(error);
                    return throwError(error.error.message);
                }

                return throwError(error);
            })
        );
    }

    getError(err: HttpErrorResponse){
        console.log('Ocurrio un error en un Servicio');
        console.warn(err);
        return throwError('Error Personalizado');
    }
}