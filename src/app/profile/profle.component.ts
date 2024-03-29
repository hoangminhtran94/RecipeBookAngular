import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  email: string;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      console.log(authState.user);
      this.email = authState.user.email;
    });
  }
}
