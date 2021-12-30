import { NotificationPage } from '../../pages/notification/notification';
import { Component } from '@angular/core';
import { NavController, AlertController, Platform, ToastController } from 'ionic-angular';
import { AccountPage } from '../../pages/account/account';
import { BasePage } from '../../pages/base/base';
import { MyorderlistPage } from '../myorderlist/myorderlist';
import { DiscountPage } from '../discount/discount';
// import { notification } from '../pages/notification/NotificationPage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  base = BasePage;
  myorderlist = MyorderlistPage;
  account = AccountPage;
  discount = DiscountPage;
  notification = NotificationPage;
  constructor(public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

  hasLogin() {
    if (localStorage.getItem('sesidman') !== null) {
      return true;
    } else if (localStorage.getItem('sesidman') === null) {
      return false;
    }
  }

  exitApp() {
    this.platform.exitApp();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
}
