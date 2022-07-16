import { Action } from '@ngrx/store';
import { Recipe } from './../recipes.model';

export const SET_RECIPES = '[Recipes] set Recipes';
export const FETCH_RECIPES = '[Recipes] fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipe] Store Recipes';
export const BACK_RECIPE_SELECT = '[Recipe] Back on Recipe Select';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}
export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
  constructor(public payload?) {}
}
export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}
export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}
export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type: string = STORE_RECIPES;
  constructor(public payload?) {}
}

export class BackOnRecipeSelect implements Action {
  readonly type: string = BACK_RECIPE_SELECT;
  constructor(public payload?) {}
}

export type RecipesAction =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
  | BackOnRecipeSelect;
