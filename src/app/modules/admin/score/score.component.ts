import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector        : 'scores',
    templateUrl     : './score.component.html',
    encapsulation   : ViewEncapsulation.None,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ScoreComponent
{
    constructor(){}
}