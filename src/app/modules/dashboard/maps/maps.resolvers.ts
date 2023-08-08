import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PatrolService } from "../patrols/patrols.service";
import { MapsService } from "./maps.service";
import { MapSimulator } from "./maps.types";

@Injectable({
    providedIn: 'root'
})
export class MapsResolver implements Resolve<any>
{
    constructor(private _mapsService: MapsService,
                private _patrolsService: PatrolService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MapSimulator[]> {
        this._patrolsService.getPatrols().subscribe();
        return this._mapsService.getMaps();
    }
}

@Injectable({
    providedIn: 'root'
})
export class MapsMapResolver implements Resolve<any>
{
    constructor(
        private _mapsService: MapsService,
        private _router: Router
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MapSimulator> {
        return this._mapsService.getMapByKey(route.paramMap.get('key'))
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