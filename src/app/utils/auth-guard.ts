import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';

//auth guard prevents unauthorized users to access pages
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var isUserLoggedIn = this.loginService.isUserLoggedIn();
        if (!isUserLoggedIn)
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return isUserLoggedIn;
    }
}