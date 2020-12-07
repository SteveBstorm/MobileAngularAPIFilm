import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginForm, RegisterForm, User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser : User
  isLogged : boolean 

  logSub : Subject<boolean> = new Subject<boolean>()

  emitIsLogged() {
    this.logSub.next(this.isLogged)
  }


  private url : string = "https://localhost:44379/api/"

  constructor(private _httpClient : HttpClient) { }

  register(newUser : RegisterForm) {
    this._httpClient.post(this.url+'auth/register', newUser).subscribe({
      next : () => console.log("Register OK"),
      error : (error) => console.log(error)
    })
  }

  login(loginInfo : LoginForm) {
    this._httpClient.post<User>(this.url+'auth/login', loginInfo).subscribe({
      next : (userFromAPI : User) => {
        this.currentUser = userFromAPI
        localStorage.setItem('token', this.currentUser.token)
        localStorage.setItem('userId', this.currentUser.customerId.toString())
        this.isLogged = true
        this.emitIsLogged()
      },
      error : (error)=> console.log(error)
    })
  }

  logout() {
    this.currentUser = null
    localStorage["token"] = ""
    localStorage["userId"] = ""
    this.isLogged = false
    this.emitIsLogged()
  }
}

