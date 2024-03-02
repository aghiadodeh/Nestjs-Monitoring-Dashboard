import { Routes } from '@angular/router';
import { analyzeRoutes } from './modules/analyze/analyze.routes';
import { databaseRoutes } from './modules/db/db.routes';
import { requestsRoutes, exceptionsRoutes } from './modules/requests/requests.routes';
import { jobsRoutes } from './modules/jobs/jobs.routes';

export const dashboardNestedRoutes: Routes = [
    ...analyzeRoutes,
    ...requestsRoutes,
    ...exceptionsRoutes,
    ...jobsRoutes,
    ...databaseRoutes,
];

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(e => e.DashboardComponent),
        children: [
            ...dashboardNestedRoutes,
            {
                path: '**',
                redirectTo: 'analyze',
                pathMatch: 'full',
            }
        ],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }
];
