import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor() {}

  ngOnInit(): void {}
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
