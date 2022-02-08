import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  private listOfIngredients: Ingredient[] = [
    new Ingredient('apples', '7'),
    new Ingredient('oranges', '5'),
  ];

  ingredientChanged = new Subject<Ingredient[]>();

  getIngredients() {
    return this.listOfIngredients.slice();
  }

  clearList() {
    this.ingredientChanged.next((this.listOfIngredients = []));
  }

  addIngredient(ingredient: Ingredient) {
    this.listOfIngredients.push(ingredient);
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }

  addListOfIngredients(ingredients: Ingredient[]) {
    this.listOfIngredients.push(...ingredients);
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }

  removeIngredients(elementsToRemove: string[]) {
    elementsToRemove.forEach((ingredientToRemove) => {
      this.listOfIngredients = this.listOfIngredients.filter((ingredient) =>
        ingredient.name !== ingredientToRemove
      );
    });
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }
}
