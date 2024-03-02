import { Routes } from '@angular/router';

export const requestsRoutes: Routes = [
    {
        path: 'requests',
        loadComponent: () => import('./requests.component').then(e => e.RequestsComponent),
        data: { title: 'requests' },
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/requests-list/requests-list.component').then(e => e.RequestsListComponent),
                data: { title: 'requests' },
            },
            {
                path: 'view/:id',
                loadComponent: () => import('./modules/request-details/request-details.component').then(e => e.RequestDetailsComponent),
            },
        ],
    }
];

export const exceptionsRoutes: Routes = [
    {
        path: 'exceptions',
        loadComponent: () => import('./requests.component').then(e => e.RequestsComponent),
        data: { title: 'exceptions', exception: true },
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/requests-list/requests-list.component').then(e => e.RequestsListComponent),
                data: { title: 'exceptions' },
            },
            {
                path: 'view/:id',
                loadComponent: () => import('./modules/request-details/request-details.component').then(e => e.RequestDetailsComponent),
            },
        ],
    }
];
