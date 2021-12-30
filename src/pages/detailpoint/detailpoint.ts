import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailpointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailpoint',
  templateUrl: 'detailpoint.html',
})
export class DetailpointPage {
  tabBarElement: any;
  datapoint: any;
  remarks: any;
  dateuse: any;
  startpoint: any;
  usepoint: any;
  endpoint: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.datapoint = JSON.parse(JSON.stringify(navParams.get('datapoint')));
    this.remarks = this.datapoint.remarks;
    this.dateuse = this.datapoint.date;
    this.startpoint = this.datapoint.startpoint;
    this.usepoint = this.datapoint.usepoint;
    this.endpoint = this.datapoint.endpoint;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailpointPage');
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

}
