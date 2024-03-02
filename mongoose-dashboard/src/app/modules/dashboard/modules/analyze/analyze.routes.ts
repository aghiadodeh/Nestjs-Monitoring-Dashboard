import { Routes } from '@angular/router';

export const analyzeRoutes: Routes = [
    {
        path: 'analyze',
        loadComponent: () => import('./analyze.component').then(e => e.AnalyzeComponent),
        data: { title: 'analyze' }
    }
];
