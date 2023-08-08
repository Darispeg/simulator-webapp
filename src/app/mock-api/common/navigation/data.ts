/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboard.maps',
        title   : 'Reportes',
        subtitle: 'Panel de reportes del simulador',
        type    : 'basic',
        icon    : 'heroicons_outline:presentation-chart-line',
        link : 'dashboard/maps'
    },
    {
        id: 'install',
        title: 'Instalacion',
        subtitle : 'Manual de instalacion',
        type: 'basic',
        link: 'install',
        icon: 'heroicons_outline:book-open'
    },
    {
        id: 'use',
        title: 'Modo de juego',
        subtitle : 'Manual de usuario',
        type: 'basic',
        link: 'use',
        icon: 'heroicons_outline:user-group'
    },
    {
        id   : 'admin',
        title: 'Administracion del sistem',
        subtitle : 'Area de administracion',
        type : 'group',
        children: [
            {
                id: 'users',
                title : 'Usuarios',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: 'admin/users'
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        link: 'dashboard',
        icon: 'heroicons_outline:chart-square-bar'
    },
    {
        id   : 'admin',
        title: 'Administracion',
        subtitle : 'Area de administracion de catalogos',
        type : 'group',
        icon : 'heroicons_outline:cog',
        children: []
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard.maps',
        title: 'Dashboard',
        type: 'basic',
        link: 'dashboard',
        icon: 'heroicons_outline:chart-square-bar'
    },
    {
        id   : 'admin',
        title: 'Administracion',
        subtitle : 'Area de administracion de catalogos',
        type : 'group',
        icon : 'heroicons_outline:cog',
        children: []
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboard.maps',
        title   : 'Reportes',
        subtitle: 'Panel de reportes del simulador',
        type    : 'basic',
        icon    : 'heroicons_outline:presentation-chart-line',
        link : 'dashboard/maps'
    },
    {
        id: 'install',
        title: 'Instalacion',
        subtitle : 'Manual de instalacion',
        type: 'basic',
        link: 'install',
        icon: 'heroicons_outline:book-open'
    },
    {
        id: 'use',
        title: 'Modo de juego',
        subtitle : 'Manual de usuario',
        type: 'basic',
        link: 'use',
        icon: 'heroicons_outline:user-group'
    },
    {
        id   : 'admin',
        title: 'Administracion',
        subtitle : 'Administracion del sistema',
        type : 'group',
        icon : 'heroicons_outline:cog',
        children: [
            {
                id: 'users',
                title : 'Usuarios',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: 'admin/users'
            }
        ]
    }
];
