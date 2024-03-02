import { Routes } from '@angular/router';

export const databaseRoutes: Routes = [
    {
        path: 'database',
        loadComponent: () => import('./db.component').then(e => e.DbComponent),
        data: { title: 'database' },
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/queries-list/queries-list.component').then(e => e.QueriesListComponent),
                data: { title: 'queries' },
            },
            {
                path: 'view/:id',
                loadComponent: () => import('./modules/query-details/query-details.component').then(e => e.QueryDetailsComponent),
            },
        ],
    }
];
