import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../users/user';
import { CookieService } from 'ngx-cookie-service';

/**Login Service is used in the login phase, but also to manage the remember me flag
 * and the logout phase and to detect if a given user is logged in or not */

@Injectable({ providedIn: 'root' })
export class LoginService {

    readonly VALIDUSERNAME: string;
    readonly VALIDPASSWORD: string;
    private currentUserSubject: BehaviorSubject<User>; //to get the current user value

    constructor(
        private cookieService: CookieService
    ) {
        this.VALIDUSERNAME = "dev";
        this.VALIDPASSWORD = "test";
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password, rememberMe):boolean {
        var validationResult = (username === this.VALIDUSERNAME && password === this.VALIDPASSWORD);
        if (validationResult) {
            const USER: User = { username, password };
            sessionStorage.setItem('currentUser', JSON.stringify(USER));
            this.currentUserSubject.next(USER);
            // supposing this cookie never exipires
            // a privacy disclaimer should be shown to the user
            if (rememberMe) { this.cookieService.set('username', username); }
        }
        return validationResult;
    }

    logout():void {
        sessionStorage.removeItem('currentUser');
        this.cookieService.deleteAll();
    }

    isUserLoggedIn():boolean {
        return (!!this.currentUserSubject.value || !!this.cookieService.get('username'));
    }
}