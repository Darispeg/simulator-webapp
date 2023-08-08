import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ApexOptions } from "ng-apexcharts";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MapsService } from "../maps.service";
import { MapSimulator } from "../maps.types";
import { MatPaginator } from "@angular/material/paginator";
import { Patrol } from "../../patrols/patrols.model";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { PatrolService } from "../../patrols/patrols.service";

@Component({
    selector: 'maps-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.css'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @ViewChild('patrolsTable', {read: MatSort}) patrolsTableMatSort: MatSort;
    @ViewChild(MatPaginator) paginator : MatPaginator;
    
    map$: Observable<MapSimulator>;
    map: MapSimulator;
    patrolsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    patrolsTableColumns: string[] = ['created', 'username', 'map', 'totalSeconds', 'qualification', 'expand'];
    
    paramsReport = new Map<string, string>([
        ["map", "value"],
        ["order", "desc"],
        ["column", "created"],
        ["type", "PDF"]
    ]);

    // Expandable Row
    columnsToDisplayWithExpand = [...this.patrolsTableColumns, 'expand'];
    expandedElement: Patrol | null;     

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _mapsService: MapsService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _patrolService: PatrolService
    ){}

    ngOnInit(): void {
        this.map$ = this._mapsService.map$;
        
        this._mapsService.map$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((map) => {
                this.map = map;
                this.patrolsDataSource.data = map.patrols;
            });
    }

    ngAfterViewInit(): void {
        this.patrolsDataSource.sort = this.patrolsTableMatSort;
        this.patrolsDataSource.paginator = this.paginator;
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

    toggleElement(element) {
        return this.expandedElement === element ? null : element;
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

    downloadReport(type: string){
        this.paramsReport.set("map", this.map.name);
        if (this.patrolsTableMatSort.direction != '')
            this.paramsReport.set("order", this.patrolsTableMatSort.direction);
        if (this.patrolsTableMatSort.active != undefined){
            let column = this.selectColumn(this.patrolsTableMatSort.active);
            this.paramsReport.set("column", column.toString());
        }
        this.paramsReport.set("type", type);

        this._patrolService.getReportPatrols(this.paramsReport).subscribe(
            (data: Blob) => {
                const downloadUrl = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = downloadUrl;
                switch(data.type){
                    case 'application/octet-stream': link.download = 'reporte - ' + this.map.name + '.xlsx';
                        break;
                    case 'application/pdf' : link.download = 'reporte - ' + this.map.name + '.pdf';
                        break;
                }

                link.click();
              },
              error => {
                console.error(error)
              }
        );
    }

    selectColumn(column: string) : String {
        switch(column) {
            case "username" : return "name";
            case "created" : return "date";
            case "qualification" : return "score";
            case "totalSeconds" : return "time";
            case "name" : return "map";
        }
    }
}