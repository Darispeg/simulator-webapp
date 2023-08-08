import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { environment } from "environments/environment";
import { map, take, tap, switchMap, filter } from 'rxjs/operators';
import { User } from "./score.types";

@Injectable({
    providedIn: 'root'
})
export class
ScoreService
{
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _message: BehaviorSubject<string | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}

    get users$(): Observable<User[]>
    {
        return this._users.asObservable();
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    getScores(): Observable<User[]>
    {
        return this._httpClient.get<User[]>(`${environment.APIurl}/users`)
        .pipe(
            tap((users) => {
                this._users.next(users);
            })
        );
    }

    updateScore(key: string, _update: User): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.put<User>(`${environment.APIurl}/users/${key}`, _update)
            .pipe(
                map((updateUser) => {
                    const index = users.findIndex(item => item['key'] === key);
                    users[index] = updateUser;
                    this._users.next(users);
                    return updateUser;
                }),
                switchMap(updateUser => this.user$.pipe(
                    take(1),
                    filter(item => item && item['key'] === key),
                    tap(() => {
                        this._user.next(updateUser);
                        return updateUser;
                    })
                ))
            ))
        );
    }
}
