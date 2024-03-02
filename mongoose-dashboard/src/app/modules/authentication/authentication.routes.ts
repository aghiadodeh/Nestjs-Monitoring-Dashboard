import { Routes } from "@angular/router";

export const authenticationRoutes: Routes = [
    {
        path: 'authentication',
        loadComponent: () => import('./authentication.component').then(e => e.AuthenticationComponent),
        data: { title: 'authentication' }
    }
];