import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, HostListener } from "@angular/core";

@Component({
    selector        : 'use',
    templateUrl     : './use.component.html',
    encapsulation   : ViewEncapsulation.None,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class UseComponent implements OnInit
{
    public imageUrl: string;

    constructor(){}
    
    ngOnInit(): void {
        this.imageUrl = 'assets/images/pictures/boyuibe.png';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // Determina la dimensión actual de la pantalla
        const screenWidth = window.innerWidth;

        // Asigna la URL de la imagen según la dimensión de la pantalla
        if (screenWidth < 768) { // Por ejemplo, consideramos ancho menor a 768px como móvil
            this.imageUrl = 'assets/images/pictures/soldier.png';
        } else {
            this.imageUrl = 'assets/images/pictures/boyuibe.png';
        }
    }
}