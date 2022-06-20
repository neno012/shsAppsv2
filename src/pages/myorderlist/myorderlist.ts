import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyorderPage } from '../../pages/myorder/myorder';
import { MyorderhotelPage } from '../../pages/myorderhotel/myorderhotel';
// import { FlightresultfilterPage } from '../flightresult/flightresultfilter/flightresultfilter';
/**
 * Generated class for the MyorderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorderlist',
  templateUrl: 'myorderlist.html',
})
export class MyorderlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderlistPage');
  }

  flightOrder(){
   this.navCtrl.push(MyorderPage);
   //this.navCtrl.push(FlightresultfilterPage);
  }

  hotelOrder(){
    this.navCtrl.push(MyorderhotelPage);
  }

  // ionViewWillLeave(){
  //   alert('exit');
  // }

  // ionicViewDidLeave(){
  //   alert('exit');

  // }

}
