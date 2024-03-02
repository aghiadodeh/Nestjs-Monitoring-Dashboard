import { Routes } from '@angular/router';

export const jobsRoutes: Routes = [
    {
        path: 'jobs',
        loadComponent: () => import('./jobs.component').then(e => e.JobsComponent),
        data: { title: 'jobs' },
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/jobs-list/jobs-list.component').then(e => e.JobsListComponent),
                data: { title: 'jobs' },
            },
            {
                path: 'view/:id',
                loadComponent: () => import('./modules/job-details/job-details.component').then(e => e.JobDetailsComponent),
            },
        ],
    }
];
