import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ScoreService } from './score.service';
import { User } from './score.types';

@Injectable({
    providedIn: 'root'
})
export class ScoreResolver implements Resolve<any>
{
    constructor(private _ScoreService: ScoreService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>
    {
        return this._ScoreService.getScores();
    }
}