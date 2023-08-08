import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MapSimulator } from "./maps.types";

@Injectable({
    providedIn: 'root'
})
export class MapsService {
    private _map : BehaviorSubject<MapSimulator | null> = new BehaviorSubject(null);
    private _maps : BehaviorSubject<MapSimulator[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}

    get maps$(): Observable<MapSimulator[]>
    {
        return this._maps.asObservable();
    }

    get map$(): Observable<MapSimulator>
    {
        return this._map.asObservable();
    }

    getMaps(): Observable<MapSimulator[]>
    {
        return this._httpClient.get<MapSimulator[]>(`${environment.APIurl}/maps`)
            .pipe(
                tap((maps) => {
                    this._maps.next(maps);
                })
            )
    }

    getMapByKey(key: string): Observable<MapSimulator>
    {
        return this._httpClient.get<MapSimulator>(`${environment.APIurl}/maps/${key}`)
            .pipe(
                tap((map) => {
                    this._map.next(map);
                })
            )
    }
}