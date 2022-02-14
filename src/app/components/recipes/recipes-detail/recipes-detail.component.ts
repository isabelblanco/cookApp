import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from './../../../services/shopping-list.service';
import { RecipeService } from './../../../services/recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingList: ShoppingListService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //just first load of the page
    //const id = this.route.snapshot.params['id'];

    //change if params change
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id)
      }
    );
  }

  sendToShoppingList() {
    this.shoppingList.addListOfIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
