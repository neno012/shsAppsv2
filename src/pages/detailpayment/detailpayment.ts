import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the DetailpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailpayment',
  templateUrl: 'detailpayment.html',
})
export class DetailpaymentPage {
  tabBarElement: any;
  datapayment: any;
  remarks: any;
  date: any;
  metode: any;
  price: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.datapayment = JSON.parse(JSON.stringify(navParams.get('datapayment')));
    this.remarks = this.datapayment.remarks;
    this.date = moment(this.datapayment.date).format('DD MMMM YYYY');
    this.metode = this.datapayment.metode;
    this.price = this.datapayment.price;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailpaymentPage');
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

}
