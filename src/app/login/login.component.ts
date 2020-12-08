import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onClickLogin(): void {
    console.log("onClickLogin");
    var formControls = this.loginForm.controls;
    var formUsername = formControls.username.value;
    var formPassword = formControls.password.value;
    var loginResult = this.loginService.login(formUsername, formPassword);
    console.log("login credentials and result:", formUsername, formPassword, loginResult);
  }

}
