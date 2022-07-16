import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap, take } from 'rxjs';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authSerive: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        const isAuth = !!authState.user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/user']);
      })
      //   tap((isAuth) => {
      //     if (!isAuth) {
      //       this.router.navigate(['/user']);
      //     }
      //   })
    );
  }
}
