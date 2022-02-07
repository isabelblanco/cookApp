import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  private listOfIngredients: Ingredient[] = [
    new Ingredient('apples', '7'),
    new Ingredient('oranges', '5'),
  ];

  ingredientChanged = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.listOfIngredients.slice();
  }

  clearList() {
    this.ingredientChanged.emit((this.listOfIngredients = []));
  }

  addIngredient(ingredient: Ingredient) {
    this.listOfIngredients.push(ingredient);
    this.ingredientChanged.emit(this.listOfIngredients.slice());
  }

  addListOfIngredients(ingredients: Ingredient[]) {
    this.listOfIngredients.push(...ingredients);
    this.ingredientChanged.emit(this.listOfIngredients.slice());
  }

  removeIngredients(elementsToRemove: string[]) {
    elementsToRemove.forEach((ingredientToRemove) => {
      this.listOfIngredients = this.listOfIngredients.filter((ingredient) =>
        ingredient.name !== ingredientToRemove
      );
    });
    this.ingredientChanged.emit(this.listOfIngredients.slice());
  }
}
