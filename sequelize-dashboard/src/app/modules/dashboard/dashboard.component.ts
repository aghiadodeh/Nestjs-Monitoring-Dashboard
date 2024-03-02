import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavContainerComponent, NavigationItem, ThemeSwitcherComponent, ToolbarComponent } from '@x-angular/cms';
import { dashboardNestedRoutes } from './dashboard.routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    ToolbarComponent,
    NavContainerComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public navigationItems: NavigationItem[] = dashboardNestedRoutes.map((route: Route) => {
    const data = route.data ?? {};
    return {
      route: route.path ?? '',
      title: data['title'],
      visible: true,
    };
  });
}
