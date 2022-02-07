import { EventEmitter, Injectable } from '@angular/core';
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

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeId(index: number) {
    return this.recipes[index];
  }
}
