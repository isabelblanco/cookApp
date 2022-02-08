import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSelected: string[] = [];
  private subscription: Subscription;

  constructor (
    private shoppingList: ShoppingListService
  ){};

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.subscription = this.shoppingList.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
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

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
