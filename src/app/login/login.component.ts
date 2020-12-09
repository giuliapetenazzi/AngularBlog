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
  //checked = false;
  hide = true;
  errorMessage: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ['', Validators.nullValidator]
    });
    this.errorMessage = "";
  }

  onClickLogin(): void {
    if (!this.loginForm.valid) {
      this.errorMessage = "Enter both username and password";
    } else {
      var formControls = this.loginForm.controls;
      var formUsername = formControls.username.value;
      var formPassword = formControls.password.value;
      var formRememberMe = formControls.rememberMe.value;
      var loginSuccess = this.loginService.login(formUsername, formPassword, formRememberMe);
      if (loginSuccess) {
        this.redirectToPosts();
      } else {
        this.errorMessage = "Wrong username or password. Please check and try again";
      }
    }
  }

  redirectToPosts(): void {
    this.router.navigate(['/posts']);
  }

}
