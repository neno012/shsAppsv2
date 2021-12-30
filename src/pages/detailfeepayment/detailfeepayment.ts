import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the DetailfeepaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailfeepayment',
  templateUrl: 'detailfeepayment.html',
})
export class DetailfeepaymentPage {
  tabBarElement: any;
  datafeepayment: any;
  remarks: any;
  date: any;
  metode: any;
  price: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.datafeepayment = JSON.parse(JSON.stringify(navParams.get('datafeepayment')));
    this.remarks = this.datafeepayment.remarks;
    this.date = moment(this.datafeepayment.date).format('DD MMMM YYYY');
    this.metode = this.datafeepayment.metode;
    this.price = this.datafeepayment.price;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailfeepaymentPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
