import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModule } from 'app/core/auth/directive/role.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RoleModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RoleModule
    ]
})
export class SharedModule
{
}
