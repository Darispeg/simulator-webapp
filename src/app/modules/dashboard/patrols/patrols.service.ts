import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Patrol } from "./patrols.model";

@Injectable({
    providedIn: 'root'
})
export class PatrolService {
    private _patrol : BehaviorSubject<Patrol | null> = new BehaviorSubject(null);
    private _patrols : BehaviorSubject<Patrol[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}

    get patrols$(): Observable<Patrol[]>
    {
        return this._patrols.asObservable();
    }

    get patrol$(): Observable<Patrol>
    {
        return this._patrol.asObservable();
    }

    getPatrols(): Observable<Patrol[]>
    {
        return this._httpClient.get<Patrol[]>(`${environment.APIurl}/patrols`)
            .pipe(
                tap((maps) => {
                    this._patrols.next(maps);
                })
            )
    }

    getPatrolByKey(key: string): Observable<Patrol>
    {
        return this._httpClient.get<Patrol>(`${environment.APIurl}/patrols/${key}`)
            .pipe(
                tap((patrol) => {
                    this._patrol.next(patrol);
                })
            )
    }

    getReportPatrols(params : Map<string, string>): Observable<Blob> 
    {
        return this._httpClient.get(`${environment.APIurl}/reports/patrols/download`, { params : {
            StartDate: '2022-01-01',
            FinishDate: '2024-01-01',
            map: params.get('map'),
            column: params.get('column'),
            order: params.get('order'),
            type: params.get('type')
        }, responseType : 'blob'});
    }
}