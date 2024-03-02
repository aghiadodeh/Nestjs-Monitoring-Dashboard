import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { CMS_CONFIGURATION } from '@x-angular/cms';
import { AppSharedModule } from '@x-angular/cms';
import { environment } from './environments/environment';
import { AppHttpInterceptor } from './core/interceptors/http.interceptor';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    provideMarkdown(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: CMS_CONFIGURATION,
      useValue: {
        CMS_API_URL: environment.API_URL,
        CMS_PAGE_SIZE: environment.PAGE_SIZE,
        DIALOG_CONFIGURATION: environment.DIALOG_CONFIGURATION,
      },
    },
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      AppSharedModule,
      HttpCacheInterceptorModule.forRoot(),
    ]),
  ],
};
