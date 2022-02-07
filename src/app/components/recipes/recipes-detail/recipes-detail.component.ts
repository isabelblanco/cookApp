import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { ShoppingListService } from './../../../services/shopping-list.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private shoppingList: ShoppingListService
  ) { }

  ngOnInit(): void {
  }

  sendToShoppingList() {
    this.shoppingList.addListOfIngredients(this.recipe.ingredients);
  }

}
