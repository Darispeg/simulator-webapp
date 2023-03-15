/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboard',
        title   : 'Dashboards',
        subtitle: 'Panel de reportes del simulador',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboard.maps',
                title: 'Panel de Control',
                type : 'basic',
                icon : 'heroicons_outline:chart-square-bar',
                link : 'dashboard/maps'
            }
        ]
    },
    {
        id   : 'admin',
        title: 'Administracion',
        subtitle : 'Area de administracion',
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
export const horizontalNavigation: FuseNavigationItem[] = [
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
