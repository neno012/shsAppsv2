import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  dataNotif: any;
  shortmessage: any;
  message: any;
  gambar: any;
  link: any;
  type: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private iab: InAppBrowser,
    private platform: Platform) {
    if (navParams.get('dataNotif')) {
      this.dataNotif = JSON.parse(JSON.stringify(navParams.get('dataNotif')));
      this.shortmessage = this.dataNotif.shortmessage;
      this.message = this.dataNotif.message;
      this.gambar = this.dataNotif.img;
      this.link = this.dataNotif.link;
      this.type = this.dataNotif.type;
    }
  }

  openLink(url: any, tipe: any) {
    if (url === 'undefined' || url === null || url === '') {
      let alert = this.alertCtrl.create({
        message: 'Sorry, No Detail Available Right Now',
        cssClass: 'alertDanger',
        buttons: [{
          text: 'OK',
        }]
      });
      alert.present();
    } else {
      if (tipe === 'update') {
        window.open(url, '_system')
      } else if (tipe === 'notif') {
        this.platform.ready().then(() => {
          let browser = this.iab.create(url, '_self', { location: 'no' });
          browser.show();

        });
      }

    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
