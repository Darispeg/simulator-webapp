import { NgModule } from "@angular/core";
import { UseComponent } from "./use.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { PipesModule } from "app/core/pipes/pipes.module";
import { SharedModule } from "app/shared/shared.module";
import { installRoutes } from "./use.routing";

@NgModule({
    declarations: [
        UseComponent
    ],
    imports: [
        RouterModule.forChild(installRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTooltipModule,
        PipesModule,
        SharedModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatExpansionModule
    ],
    providers : []
})
export class UseModule{}