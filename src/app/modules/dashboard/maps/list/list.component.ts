import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ApexOptions } from "ng-apexcharts";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Patrol } from "../../patrols/patrols.model";
import { PatrolService } from "../../patrols/patrols.service";
import { MapsService } from "../maps.service";
import { Map } from "../maps.types";

@Component({
    selector       : 'maps-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsListComponent implements OnInit, AfterViewInit, OnDestroy
{

    @ViewChild('recognitionsTable', {read: MatSort}) recognitionsTableMatSort: MatSort;
    @ViewChild('TABLE') table: ElementRef
    // Patrols
    patrols$: Observable<Patrol[]>;
    patrolsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    patrolsTableColumns: string[] = ['created', 'username', 'map', 'totalSeconds', 'qualification'];
    patrolsCount: number;

    @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
        this.patrolsDataSource.sort = sort;
    }

    chartTaskDistribution: ApexOptions = {};
    chartPatrolsForMap: ApexOptions = {};
    maps$: Observable<Map[]>;
    mapsChart: Map[];
    mapsLabel: string[] = [];
    mapsSeries: number[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _mapsService: MapsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _patrolsService: PatrolService
    ){}

    ngOnInit(): void {
        this.maps$ = this._mapsService.maps$;

        this._mapsService.maps$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((maps) => {
                this.mapsChart = maps;
            })

        for(let element of this.mapsChart){
            this.mapsLabel.push(element.name);
            this.mapsSeries.push(element.patrols.length);
        }

        this.patrols$ = this._patrolsService.patrols$;
        
        this._patrolsService.patrols$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((patrols) => {
                this.patrolsDataSource = new MatTableDataSource(patrols);
        });

        this._prepareChartData();

        this._changeDetectorRef.markForCheck();
    }

    ngAfterViewInit(): void {
        this.patrolsDataSource.sort = this.recognitionsTableMatSort;
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    MapFindByKey(key: string){
        let url = './' + key
        this._router.navigate([url], {relativeTo: this._activatedRoute})
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.Key || index;
    }

    trackByFnTable(index: number, item: any): any
    {
        return item.id || index;
    }
    
    private _prepareChartData(): void {
        this.chartTaskDistribution = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'polarArea',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            labels     : this.mapsLabel,
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
            series     : this.mapsSeries,
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

        this.chartPatrolsForMap = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'pie',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors     : ['#2469A0', '#10BCE3', '#3DD6AF', '#8BE27E'],
            dataLabels : {
                enabled        : true,
                enabledOnSeries: [0],
                background     : {
                    borderWidth: 0
                }
            },
            grid       : {
                borderColor: 'var(--fuse-border)'
            },
            labels     : this.mapsLabel,
            legend     : {
                show: true
            },
            plotOptions: {
                bar: {
                    columnWidth: '25%'
                }
            },
            series     : this.mapsSeries,
            states     : {
                hover: {
                    filter: {
                        type : 'darken',
                        value: 0.75
                    }
                }
            },
            stroke     : {
                width: [3, 0]
            },
            tooltip    : {
                followCursor: true,
                theme       : 'dark'
            },
            xaxis      : {
                axisBorder: {
                    show: false
                },
                axisTicks : {
                    color: 'var(--fuse-border)'
                },
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip   : {
                    enabled: false
                }
            },
            yaxis      : {
                labels: {
                    offsetX: -16,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
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
}