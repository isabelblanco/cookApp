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
  startedEditing = new Subject<number>();

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

  updateIngredient(index: number, ingredient:Ingredient) {
    this.listOfIngredients[index].name = ingredient.name;
    this.listOfIngredients[index].amount = ingredient.amount;
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }

  addListOfIngredients(ingredients: Ingredient[]) {
    this.listOfIngredients.push(...ingredients);
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }

  deleteIngredient(index: number) {
    this.listOfIngredients.splice(index, 1);
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }

  deleteAllIngredients() {
    this.listOfIngredients = [];
    this.ingredientChanged.next(this.listOfIngredients.slice());
  }
}
