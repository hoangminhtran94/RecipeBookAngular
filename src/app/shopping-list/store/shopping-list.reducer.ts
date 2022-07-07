import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Salt', 2), new Ingredient('Eggs', 2)],
};
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListAction.AddIngredient
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
  }
}
