import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiUserModuleService } from '../service/api-user-module.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: ApiUserModuleService
    ) {
        debugger
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            debugger
            this.router.navigate(['/']);
        }
        debugger
    }
}