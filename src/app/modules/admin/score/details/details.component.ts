import { DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { fromEvent, Observable, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil } from "rxjs/operators";
import { ScoreService } from "../score.service";
import { User } from "../score.types";
import { MyErrorStatusMatcher } from "app/shared/error-status-matcher";

@Component({
    selector       : 'score-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreDetailsComponent implements OnInit, OnDestroy
{
    OutputPanelOpenState = false;

    users$: Observable<User[]>;
    scoreForm: FormGroup;
    matcher = new MyErrorStatusMatcher();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _scoreService: ScoreService,
        private _formBuilder: FormBuilder,
    )
    {}

    ngOnInit(): void
    {
        this.scoreForm = this._formBuilder.group({
            key: [''],
            output: [0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            pro: [0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            clover: [0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            pd: [0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            target: [0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            prdo: [0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            // Salida de lineas amigas
            pri: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            pc: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            formation: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            pp: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            px: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            boxPx: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
            proPx: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]]
        }, { validator: this.checkPercentageSum });

        this.users$ = this._scoreService.users$;
        this._scoreService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users) => {
                
            });

        this._scoreService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((User: User) => {
                this._changeDetectorRef.markForCheck();
            });
        
        this.checkPercentageSum(this.scoreForm);
    }

    checkPercentageSum(formGroup: FormGroup) {
        const input1Value = formGroup.get('output').value;
        const input2Value = formGroup.get('pro').value;
        const input3Value = formGroup.get('clover').value;
        const input4Value = formGroup.get('pd').value;
        const input5Value = formGroup.get('target').value;
        const input6Value = formGroup.get('prdo').value;
        // Calcula la suma de los valores
        const sum = input1Value + input2Value + input3Value + input4Value + input5Value + input6Value;
        
        // Comprueba si la suma es diferente al 100%
        if (sum === 100 || sum > 100) {
          return { percentageSumInvalid: true };
        }
        
        return null;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.Key || index;
    }
}