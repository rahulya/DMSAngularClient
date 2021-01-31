import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApiUserModuleService } from '../service/api-user-module.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: ApiUserModuleService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.password;
        const isApiUrl = request.url.startsWith(environment.appUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.password}`
                }
            });
        }

        return next.handle(request);
    }
}