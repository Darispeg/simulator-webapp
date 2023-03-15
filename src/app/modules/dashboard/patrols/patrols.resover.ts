import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Patrol } from "./patrols.model";
import { PatrolService } from "./patrols.service";

@Injectable({
    providedIn: 'root'
})
export class MapsMapResolver implements Resolve<any>
{
    constructor(
        private _patrolsService: PatrolService,
        private _router: Router
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patrol> {
        return this._patrolsService.getPatrolByKey(route.paramMap.get('key'))
            .pipe(
                catchError((error) => {
                    console.error(error);
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');
                    this._router.navigateByUrl(parentUrl);
                    return throwError(error);
                })
            );
    }
}