import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ShowqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showqr',
  templateUrl: 'showqr.html',
})
export class ShowqrPage {
  qr: any;
  gambar: any;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.qr = JSON.parse(JSON.stringify(this.navParams.get("qr")));
    this.gambar = this.qr.gambar;
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowqrPage');
  }

}
