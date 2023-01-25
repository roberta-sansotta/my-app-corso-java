import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  emailControl = new FormControl('', [Validators.maxLength(30), Validators.required])
  passwordControl = new FormControl('', [Validators.maxLength(20), Validators.required])
  errorMessage: string = ''

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    console.log("sono nell'on init")

    this.emailControl.valueChanges.subscribe({
      next: (value) => {
        if (this.emailControl.valid && this.passwordControl.valid) {
          this.errorMessage = ''
        }
        if (this.emailControl.invalid && this.passwordControl.invalid) {
          this.errorMessage = 'Valori inseriti non validi'
        }
        console.log('email valore cambiato: ', value)
      },
      error: (error) => { console.error(error) },
      complete: () => { console.warn("completato") },
    })

    this.passwordControl.valueChanges.subscribe({
      next: (value) => {
        if (this.emailControl.valid && this.passwordControl.valid) {
          this.errorMessage = ''
        }
        if (this.emailControl.invalid && this.passwordControl.invalid) {
          this.errorMessage = 'Valori inseriti non validi'
        }
        console.log('password valore cambiato: ', value)
      },
      error: (error) => { console.error(error) },
      complete: () => { console.warn("completato") },
    })
  }

  onLoginClick() {
    if (this.emailControl.valid && this.passwordControl.valid) {
      this.errorMessage = ''

      const email = this.emailControl.value
      const password = this.passwordControl.value

      // login call
      if (email !== null && password !== null) {
        this.loginService.login(email, password).subscribe({
          next: (value) => {
            console.log('risposta dal server fake: ', value)

            let authResponse = {
              username: 'ciao@ciao.it',
              ruolo: 'lettore',
              token: 'sdkhfgsdkjdsgkjgfdkjshgfsdasdas'
            }

            let authResponseString = JSON.stringify(authResponse)

            localStorage.setItem('fake-auth-response-object', authResponseString)
            localStorage.setItem('fake-token', value)

            this.router.navigateByUrl('/home');
          },
          error: (error) => { console.error(error) },
          complete: () => { console.warn("completato") },
        })

        // this.loginService.signIn({ email, password }).subscribe({
        //   next: (response) => {
        //     console.log(response)
        //   },
        //   error: (error) => console.error(error),
        //   complete: () => console.warn('completato')
        // })
      }
    } else {
      this.emailControl.markAsTouched()
      this.passwordControl.markAsTouched()
      this.errorMessage = 'Valori inseriti non validi'
    }
  }

}
