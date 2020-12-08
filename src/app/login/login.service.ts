import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class LoginService {

    readonly VALIDUSERNAME: string;
    readonly VALIDPASSWORD: string;
    //public currentUser: Observable<User>; //used to react when user changes, now not used
    private currentUserSubject: BehaviorSubject<User>; //to get the current user value

    constructor() {
        this.VALIDUSERNAME = "dev";
        this.VALIDPASSWORD = "test";
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        //this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        var validationResult = (username === this.VALIDUSERNAME && password === this.VALIDPASSWORD);
        if (validationResult) {
            const USER:User = {username, password};
            localStorage.setItem('currentUser', JSON.stringify(USER));
            this.currentUserSubject.next(USER);
        }
        return validationResult;
    }

    logout() {
        localStorage.removeItem('currentUser');
        //TODO
    }
}