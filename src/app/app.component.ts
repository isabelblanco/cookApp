import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  view = '';

  setView(viewSelected: string) {
    if (viewSelected === 'recipes') {
      this.view = 'recipes';
    }
    else if (viewSelected === 'shoppingList') {
      this.view = 'shoppingList';
    }
  }
}
