import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { map, Subscription } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
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
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: UntypedFormGroup;
  private subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
      this.store.dispatch(new RecipeActions.StoreRecipes());
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
      this.store.dispatch(new RecipeActions.StoreRecipes());
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onAddAnIngredient() {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        name: new UntypedFormControl(null, Validators.required),
        amount: new UntypedFormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onDeleteAnIngredient(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIncredients = new UntypedFormArray([]);

    if (this.editMode) {
      this.subscription = this.store
        .select('recipes')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return this.id === index;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIncredients.push(
                new UntypedFormGroup({
                  name: new UntypedFormControl(
                    ingredient.name,
                    Validators.required
                  ),
                  amount: new UntypedFormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new UntypedFormGroup({
      name: new UntypedFormControl(recipeName, Validators.required),
      imagePath: new UntypedFormControl(recipeImagePath, Validators.required),
      description: new UntypedFormControl(
        recipeDescription,
        Validators.required
      ),
      ingredients: recipeIncredients,
    });
  }
  get controls() {
    // a getter!
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
