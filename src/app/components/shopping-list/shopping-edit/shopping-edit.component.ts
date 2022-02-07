import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit {
  @Input() ingredientsSelected: string[];
  @ViewChild('ingredientNumberInput', {static: true}) ingredientNumber: ElementRef;
  @ViewChild('ingredientInputName', {static: true}) ingredientName: ElementRef;

  constructor(
    private shoppingList: ShoppingListService
  ) { }

  ngOnInit(): void {
  }

  addIngredient(nameInput: HTMLInputElement) {
    if (nameInput.value !== '') {
      const amount = this.ingredientNumber.nativeElement.value || '1';
      const newIngredient = new Ingredient(nameInput.value, amount);
      this.shoppingList.addIngredient(newIngredient);

      this.ingredientNumber.nativeElement.value = '';
      this.ingredientName.nativeElement.value = ''
    }
  }

  clearIngredients() {
    this.shoppingList.clearList();
  }

  deleteIngredients() {
    this.shoppingList.removeIngredients(this.ingredientsSelected)
  }
}
