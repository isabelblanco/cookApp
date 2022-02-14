import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from './../models/ingredient.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  private recipes: Recipe[] = [
    new Recipe(
      'Receta1',
      'Receta de prueba',
      'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__340.jpg',
      [
        new Ingredient('apples', '2'),
        new Ingredient('oranges', '5')
      ]
    ),
    new Recipe(
      'Receta2',
      'Receta de text',
      'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__340.jpg',
      [
        new Ingredient('tomatoes', '8'),
        new Ingredient('lemos', '1')
      ]
    )
  ]

  recipesChanged = new Subject<Recipe[]>()

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
