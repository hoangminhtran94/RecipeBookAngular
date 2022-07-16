import { Recipe } from '../recipes.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
  back: boolean;
}
const initialState: State = {
  recipes: [],
  back: true,
};
export function recipeReducer(
  state: State = initialState,
  action: RecipeActions.RecipesAction
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPE:
      //   const updatedRecipes = state.recipes.slice(action.payload.index, 1);
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        }),
      };
    case RecipeActions.BACK_RECIPE_SELECT:
      return {
        ...state,
        back: !state.back,
      };
    default:
      return state;
  }
}
