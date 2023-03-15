import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ApexOptions } from "ng-apexcharts";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MapsService } from "../maps.service";
import { Map } from "../maps.types";

@Component({
    selector: 'maps-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @ViewChild('patrolsTable', {read: MatSort}) patrolsTableMatSort: MatSort;
    @ViewChild('usersTable', {read: MatSort}) usersTableMatSort: MatSort;
    
    map$: Observable<Map>;
    map: Map;
    patrolsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    patrolsTableColumns: string[] = ['created', 'username', 'map', 'totalSeconds', 'qualification'];
    chartUsers: ApexOptions = {};
    users: string[] = [];
    userLabel: string[] = []
    userSeries: number[] = []
    usersDataSource: MatTableDataSource<any> = new MatTableDataSource();
    usersTableColumns: string[] = ['username'];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _mapsService: MapsService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
    ){}

    ngOnInit(): void {
        this.map$ = this._mapsService.map$;
        
        this._mapsService.map$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((map) => {
                this.map = map;
                this.patrolsDataSource.data = map.patrols;
            });

        this.map.patrols.forEach(element => {
            this.users.push(element.username);
        });

        this.countUsers(this.users).forEach(element => {
            this.userLabel.push(element.number1);
            this.userSeries.push(element.count);
        });

        this.usersDataSource.data = this.userLabel;

        this._prepareChartData();
    }

    ngAfterViewInit(): void {
        this.patrolsDataSource.sort = this.patrolsTableMatSort;
        this.usersDataSource.sort = this.usersTableMatSort;
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onBackdropClicked(): void
    {
        this._router.navigate(['../../'], {relativeTo: this._activatedRoute});
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    secondsToString(seconds): string {
        let hourNumber = Math.floor(seconds / 3600);
        let hour = (hourNumber < 10)? '0' + hourNumber : hourNumber;
        let minuteNumber = Math.floor((seconds / 60) % 60);
        let minute = (minuteNumber < 10)? '0' + minuteNumber : minuteNumber;
        let secondNumber = seconds % 60;
        let second = (secondNumber < 10)? '0' + secondNumber : secondNumber;
        return hour + ':' + minute + ':' + second;
    }

    countUsers(users: string[]){
        const specimens = users.filter((number1, i) => i == 0 ? true : users[i - 1] != number1);
        const counterSpecimens = specimens.map(spec => {
            return {number1: spec, count: 0};
        });
        
        counterSpecimens.map((countSpec, i) =>{
            const actualSpecLength = users.filter(number1 => number1 === countSpec.number1).length;
            countSpec.count = actualSpecLength;
        })
        return counterSpecimens;
    }

    private _prepareChartData(): void {
        this.chartUsers = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'bar',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            labels     : this.userLabel,
            legend     : {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)'
                    },
                    rings : {
                        strokeColor: 'var(--fuse-border)'
                    }
                }
            },
            series     :[{
                            name: 'patrullajes',
                            data: this.userSeries
                        }],
            colors     : ['#2469A0', '#10BCE3', '#3DD6AF', '#8BE27E'],
            states     : {
                hover: {
                    filter: {
                        type : 'darken',
                        value: 0.75
                    }
                }
            },
            stroke     : {
                width: 2
            },
            tooltip    : {
                followCursor: true,
                theme       : 'dark'
            },
            yaxis      : {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
    }
}