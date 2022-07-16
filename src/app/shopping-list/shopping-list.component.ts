import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as shoppingListAction from './store/shopping-list.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
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
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subcription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subcription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }
  ngOnDestroy(): void {
    // this.subcription.unsubscribe();
  }
  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new shoppingListAction.StartEdit(index));
  }
}
