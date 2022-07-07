import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observer, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  authForm: FormGroup;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['../recipes']);
        setTimeout(
          () => this.dataStorageService.fetchRecipe().subscribe(),
          2000
        );
      },
      error: (errorRes) => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLoading = false;
      },
    });

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
