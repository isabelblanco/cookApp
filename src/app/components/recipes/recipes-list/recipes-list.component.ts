import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSuscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSuscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }

  ngOnDestroy(): void {
      this.recipesSuscription.unsubscribe();
  }
}
