import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  ingredientsSelected: string[] = [];

  constructor (
    private shoppingList: ShoppingListService
  ){};

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.shoppingList.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  selectIngredients(ingredient: any) {
    if (!this.ingredientsSelected.includes(ingredient.id)) {
      this.ingredientsSelected.push(ingredient.id);
      ingredient.classList.add('selected')
    } else {
      this.ingredientsSelected.splice(this.ingredientsSelected.indexOf(ingredient.id), 1);
      ingredient.classList.remove('selected');
    }
  }
}
