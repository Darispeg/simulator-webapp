import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Map } from "./maps.types";

@Injectable({
    providedIn: 'root'
})
export class MapsService {
    private _map : BehaviorSubject<Map | null> = new BehaviorSubject(null);
    private _maps : BehaviorSubject<Map[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}

    get maps$(): Observable<Map[]>
    {
        return this._maps.asObservable();
    }

    get map$(): Observable<Map>
    {
        return this._map.asObservable();
    }

    getMaps(): Observable<Map[]>
    {
        return this._httpClient.get<Map[]>(`${environment.APIurl}/maps`)
            .pipe(
                tap((maps) => {
                    this._maps.next(maps);
                })
            )
    }

    getMapByKey(key: string): Observable<Map>
    {
        return this._httpClient.get<Map>(`${environment.APIurl}/maps/${key}`)
            .pipe(
                tap((map) => {
                    this._map.next(map);
                })
            )
    }
}