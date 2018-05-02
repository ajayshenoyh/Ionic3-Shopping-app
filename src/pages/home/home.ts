import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {AddShoppingItemPage} from '../add-shopping-item/add-shopping-item';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { Item } from '../../models/item/item.model';
import { Observable } from 'rxjs/Observable';
import { EditShoppingListPage } from '../edit-shopping-list/edit-shopping-list';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
shoppingList$: Observable<Item[]>;

constructor(public navCtrl: NavController, private shopping: ShoppingListProvider) {
this.shoppingList$ = this.shopping
  .getShoppingList()  //DB LIST
  .snapshotChanges()  //Key value 
  .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, 
        ...c.payload.val(),
      }));
    });
  }
  gotoAddShoppingItem()
  {
    this.navCtrl.push(AddShoppingItemPage);
  }
  gotoEditShoppingList(item)
  {
    this.navCtrl.push(EditShoppingListPage, {
      editItem: item,
    });
  }
}
