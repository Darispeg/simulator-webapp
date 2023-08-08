import { Route } from '@angular/router';
import { ScoreDetailsComponent } from './details/details.component';
import { ScoreComponent } from './score.component';
import { ScoreResolver } from './score.resolver';

export const usersRoutes: Route[] = [
    {
        path     : '',
        component: ScoreComponent,
        children : [
            {
                path        : '',
                component   : ScoreDetailsComponent,
                resolve     : {
                    task : ScoreResolver
                }
            },
        ]
    }
]