import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

const BASE_URL = 'https://serverXYZ.it'

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    let callObservable = of({ email, password }).pipe(map(() => 'sdfjgsdjfgsjhgedfjhsd')) //http request fake
    return callObservable
  }

  // signIn(user: { email: string, password: string }) {
  //   return this.http.post<{ username: string, token: string }>(BASE_URL + '/sign-in', user);
  // }

}
