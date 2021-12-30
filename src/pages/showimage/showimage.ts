import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ShowimagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showimage',
  templateUrl: 'showimage.html',
})
export class ShowimagePage {
  disc: any;
  nama: any;
  diskon: any;
  gambar: any;
  alamat: any;
  latt: any;
  long: any;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.disc = JSON.parse(JSON.stringify(this.navParams.get("disc")));
    this.nama = this.disc.nama;
    this.diskon = this.disc.diskon;
    this.gambar = this.disc.gambar;
    this.alamat = this.disc.alamat;
    this.latt = this.disc.latt;
    this.long = this.disc.long;
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowimagePage');
  }

  openMaps(latitude: any, longitude: any, namamap: any) {
    window.open('geo:' + latitude + ',' + longitude + '?q=' + namamap, '_system');
  }

}
