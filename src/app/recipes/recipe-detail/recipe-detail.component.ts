import { Component, OnInit } from '@angular/core';
import { Recipe } from './../recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translatex(0)',
        })
      ),
      transition('void=>*', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]),
      transition('*=>void', [
        animate(
          300,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => {
            return this.id === index;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.store.dispatch(new RecipeActions.StoreRecipes());
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
