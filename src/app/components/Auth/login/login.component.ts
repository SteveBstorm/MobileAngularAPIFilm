import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginForm } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fg : FormGroup
  isLogged : boolean = localStorage['token'] == '' ? false : true
  sub : Subscription
  constructor(
    private _builder : FormBuilder,
    private _authService : AuthService
  ) { }

  ngOnInit(): void {
    
    this.fg = this._builder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    })

    this.sub = this._authService.logSub.subscribe((data) => this.isLogged = data)
  }

  onSubmit() {
    const loginInfo = new LoginForm()
    const formValues = this.fg.value
    loginInfo.email = formValues['email']
    loginInfo.passwd = formValues['password']

    this._authService.login(loginInfo)
    this.isLogged = this._authService.isLogged
  }

  logout(){
    this._authService.logout()
    this.isLogged = false
  }

}
