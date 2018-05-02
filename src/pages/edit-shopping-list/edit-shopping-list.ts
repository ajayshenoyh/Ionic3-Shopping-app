import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Item } from '../../models/item/item.model';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage {
  item : Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListProvider: ShoppingListProvider, private alertController: AlertController) {
  }

  ionViewWillLoad() {
    this.item= this.navParams.get('editItem');
  }

  updateItem(item: Item) {
    this.shoppingListProvider.updateItem(item).then(() => {
      this.shoppingListProvider.presentToast(`${item.name} Updated Sucessfully`);
      this.navCtrl.setRoot(HomePage);
    });
  }
  removeItem(item: Item) {
    let alert = this.alertController.create({
      title: 'Confirm',
      message: 'Do you want to delete it from Shopping List?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.shoppingListProvider.removeItem(item)
            alert.onDidDismiss(()=>{
              this.shoppingListProvider.presentToast(`${item.name} Deleted Successfully`);
              this.navCtrl.setRoot(HomePage);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
