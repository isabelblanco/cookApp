import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') ingredientsForm: NgForm;
  editModesubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListSvc: ShoppingListService
  ) { }

  ngOnInit(): void {
    this.editModesubscription = this.shoppingListSvc.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListSvc.getIngredients()[index];
        this.ingredientsForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  addIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListSvc.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListSvc.addIngredient(newIngredient);
    }

    this.clearForm();
  }

  deleteIngredient() {
    if (this.editMode) {
      this.shoppingListSvc.deleteIngredient(this.editedItemIndex);
    } else {
      this.shoppingListSvc.deleteAllIngredients();
    }

    this.clearForm();
  }

  clearForm() {
    this.ingredientsForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.editModesubscription.unsubscribe()
  }
}
