import { Component, OnInit, OnDestroy, enableProdMode } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Ingredient } from './../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListAction from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingListForm: UntypedFormGroup;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedIngredient: Ingredient;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.shoppingListForm = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      amount: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
    });

    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;

          this.editedIngredient = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });
    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedIngredient = this.shoppingListService.getIngredient(index);
    //     this.shoppingListForm.setValue({
    //       name: this.editedIngredient.name,
    //       amount: this.editedIngredient.amount,
    //     });
    //   }
    // );
  }
  onSubmit() {
    const newIngredient = new Ingredient(
      this.shoppingListForm.get('name').value,
      this.shoppingListForm.get('amount').value
    );
    if (!this.editMode) {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new shoppingListAction.AddIngredient(newIngredient));
    }
    // this.shoppingListService.updateIngredient(
    //   this.editedItemIndex,
    //   newIngredient
    // );
    this.store.dispatch(new shoppingListAction.UpdateIngredient(newIngredient));
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListAction.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new shoppingListAction.DeleteIngredient());
    this.onClear();
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListAction.StopEdit());
  }
}
