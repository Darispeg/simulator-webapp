import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MapsDetailsComponent } from "./details/details.component";

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateMapsDetails implements CanDeactivate<MapsDetailsComponent>
{
    canDeactivate(
        component: MapsDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }

        if ( !nextState.url.includes('/maps') )
        {
            return true;
        }

        if ( nextRoute.paramMap.get('key') )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}