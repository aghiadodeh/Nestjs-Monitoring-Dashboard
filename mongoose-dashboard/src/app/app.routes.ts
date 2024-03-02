import { Routes } from '@angular/router';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { authenticationRoutes } from './modules/authentication/authentication.routes';

export const appRoutes: Routes = [
    ...authenticationRoutes,
    ...dashboardRoutes,
];
