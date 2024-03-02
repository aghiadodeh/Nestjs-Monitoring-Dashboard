import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';;
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private router = inject(Router);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('http')) {
            if (localStorage.getItem('access_token')) {
                // add Authorization
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
            }
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // if server return 200 Http StatusCode
                // check for Response Body if has flag `success` equal `false`
                const body = event.body ?? {};
                const { message, statusCode, success } = body;

                if (success == false) {
                    const error = {
                        status: statusCode,
                        statusText: message,
                        message,
                        ...body,
                    };

                    throw new HttpErrorResponse({ error });
                }
            }
        })).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status == 401) {
                this.router.navigate(['/authentication'], { replaceUrl: true });
            }
            return throwError(() => error);
        }));
    }
}