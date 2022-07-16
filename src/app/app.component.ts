import { Component, OnInit } from '@angular/core';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';
import * as RecipeActions from './recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    if (localStorage.getItem('userData')) {
      setTimeout(
        () => this.store.dispatch(new RecipeActions.FetchRecipes()),
        500
      );
    }
  }
  title = 'Recipe Book';
  loadedFeature = 'recipe';
}
