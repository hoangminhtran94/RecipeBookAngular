import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const AUTHENTICATE_SUCESS = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticateSucess implements Action {
  readonly type: string = AUTHENTICATE_SUCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  constructor(public payload?) {}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type: string = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type: string = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class ClearError implements Action {
  readonly type: string = CLEAR_ERROR;
  constructor(public payload?) {}
}
export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
  constructor(public payload?) {}
}

export type AuthActions =
  | AuthenticateSucess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin;
