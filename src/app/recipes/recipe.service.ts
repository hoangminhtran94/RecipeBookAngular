import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService {
  changedRecipe = new Subject<Recipe[]>();
  constructor(private store: Store<fromApp.AppState>) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Hamburger',
  //     'This is a test',
  //     'https://image.shutterstock.com/image-photo/blank-vintage-recipe-cooking-book-600w-504504346.jpg',
  //     [new Ingredient('Onion', 2), new Ingredient('Salt', 3)]
  //   ),
  //   new Recipe(
  //     'An egg-fried rice',
  //     'This is a test',
  //     'https://image.shutterstock.com/image-photo/blank-vintage-recipe-cooking-book-600w-504504346.jpg',
  //     [new Ingredient('Egg', 2), new Ingredient('Rice', 3)]
  //   ),
  // ];
  private recipes: Recipe[];
  getRecipe() {
    return this.recipes;
  }
  getARecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredient);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.changedRecipe.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.changedRecipe.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.changedRecipe.next(this.recipes.slice());
  }

  getRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.changedRecipe.next(this.recipes.slice());
  }
}
