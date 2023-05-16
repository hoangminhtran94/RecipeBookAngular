import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes.model';
import { Injectable } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class RecipeEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap((fetchAction) => {
        return this.http.get<Recipe[]>(
          'https://recipe-book-ea5f2-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipeActions.SetRecipes(recipes);
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([storeRecipeAction, recipeState]) => {
          return this.http.put(
            'https://recipe-book-ea5f2-default-rtdb.firebaseio.com/recipes.json',
            recipeState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  backOnRecipeSelect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.BACK_RECIPE_SELECT),
        withLatestFrom(this.store.select('recipes')),
        tap(([backAction, recipeState]) => {
          if (recipeState.back === true) {
            this.router.navigate(['..']);
          }
        })
      ),
    { dispatch: false }
  );
}
