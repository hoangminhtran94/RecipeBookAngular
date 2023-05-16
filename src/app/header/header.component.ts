import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private userEmail: string;
  isAuthenticated = false;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe((authState) => {
      const user = authState.user;

      this.isAuthenticated = !user ? false : true;
      if (!user) {
        return;
      }
      this.userEmail = user.email;
    });
    console.log(this.isAuthenticated);
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
