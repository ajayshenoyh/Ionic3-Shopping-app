import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../../models/item/item.model';
import { ToastController} from 'ionic-angular';

/*
  Generated class for the ShoppingListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingListProvider {
private shoppingListRef = this.db.list<Item>('shopping-list');

  constructor(public http: HttpClient, public db: AngularFireDatabase, public toastController: ToastController) {
    console.log('Hello ShoppingListProvider Provider');
  }

  getShoppingList() {
    return this.shoppingListRef;
  }

  addItem(item: Item) {
    return this.shoppingListRef.push(item);
  }
  
  updateItem(item: Item) {
    return this.shoppingListRef.update(item.key,item);
  }

  removeItem(item: Item) {
    return this.shoppingListRef.remove(item.key);
  }

  presentToast(message) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  
  

}
