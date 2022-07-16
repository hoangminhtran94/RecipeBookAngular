import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  authForm: UntypedFormGroup;
  storeSub: Subscription;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
    this.authForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl(null, [
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
    // let authObs: Observable<AuthResponseData>;
    // this.isLoading = true;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
    // authObs.subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.error = null;
    //     this.router.navigate(['../recipes']);
    //     setTimeout(
    //       () => this.dataStorageService.fetchRecipe().subscribe(),
    //       2000
    //     );
    //   },
    //   error: (errorRes) => {
    //     console.log(errorRes);
    //     this.error = errorRes;
    //     this.isLoading = false;
    //   },
    // });

    this.authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
