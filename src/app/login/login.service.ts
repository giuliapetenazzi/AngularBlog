import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {

    readonly VALIDUSERNAME: string;
    readonly VALIDPASSWORD: string;

    constructor() {
        this.VALIDUSERNAME = "developer";
        this.VALIDPASSWORD = "private";
    }

    login(username, password) {
        console.log("service: up ", username, password, this.VALIDUSERNAME, this.VALIDPASSWORD);
        var validationResult = (username === this.VALIDUSERNAME && password === this.VALIDPASSWORD);
        if (validationResult) {
            localStorage.setItem('currentUser', JSON.stringify(username+"|"+password));
        } else {
            console.error("Invalid credentials");
        }
        return validationResult;
    }

    logout() {
        localStorage.removeItem('currentUser');
        //TODO
    }
}