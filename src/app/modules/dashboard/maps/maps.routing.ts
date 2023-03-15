import { Route } from "@angular/router"
import { MapsMapResolver, MapsResolver } from "./maps.resolvers"
import { MapsComponent } from "./maps.component"
import { MapsDetailsComponent } from "./details/details.component"
import { MapsListComponent } from "./list/list.component"

export const mapsRoutes: Route[] = [
    {
        path     : '',
        component: MapsComponent,
        children : [
            {
                path    : '',
                pathMatch: 'full',
                component: MapsListComponent,
                resolve  : {
                    tasks : MapsResolver
                }
            },
            {
                path        : ':key',
                component   : MapsDetailsComponent,
                resolve     : {
                    tasks: MapsMapResolver
                }
            }
        ]
    }
]