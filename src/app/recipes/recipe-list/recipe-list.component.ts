import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './../recipes.model';
import { RecipeService } from './../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  back: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('recipes')
      .pipe(
        map((recipeState) => {
          return recipeState.recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBack() {
    this.store.dispatch(new RecipeActions.BackOnRecipeSelect());
  }
}
