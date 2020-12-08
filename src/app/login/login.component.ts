import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //onClickLog//in(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
  onClickLogin(): void {
    var formControls = this.loginForm.controls;
    var formUsername = formControls.username.value;
    var formPassword = formControls.password.value;
    var loginSuccess = this.loginService.login(formUsername, formPassword);
    if (loginSuccess) {
      this.redirectToPosts();
    } else {
      console.error("login failed credentials and result:", formUsername, formPassword, loginSuccess);
    }
  }

  redirectToPosts(): void {
    this.router.navigate(['/posts']/*, { queryParams: { returnUrl: state.url }}*/);
  }
}
