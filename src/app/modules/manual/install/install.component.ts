import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostListener, OnInit } from "@angular/core";

@Component({
    selector        : 'install',
    templateUrl     : './install.component.html',
    encapsulation   : ViewEncapsulation.None,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class InstallComponent implements OnInit
{
    public imageUrl: string;

    constructor(){}
    
    ngOnInit(): void {
        this.imageUrl = 'assets/images/pictures/landscape-2.png';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // Determina la dimensión actual de la pantalla
        const screenWidth = window.innerWidth;

        // Asigna la URL de la imagen según la dimensión de la pantalla
        if (screenWidth < 768) { // Por ejemplo, consideramos ancho menor a 768px como móvil
            this.imageUrl = 'assets/images/pictures/soldier-2.png';
        } else {
            this.imageUrl = 'assets/images/pictures/landscape-2.png';
        }
    }
}