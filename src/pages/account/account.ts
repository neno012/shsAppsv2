import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';

import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { ChangepassPage } from '../../pages/changepass/changepass';
import { HispaymentPage } from '../../pages/hispayment/hispayment';
import { FeepaymentPage } from '../../pages/feepayment/feepayment';
import { HispointPage } from '../../pages/hispoint/hispoint';
import { SettingsPage } from '../../pages/settings/settings';
import { ShscardPage } from '../../pages/shscard/shscard';
import { MyprofilePage } from '../myprofile/myprofile';
import { PrivacyPage } from '../privacy/privacy';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  memcod    : any;
  profpic   : any;
  profmail  : any;
  dataPoint : any;
  nowPoint  : any;
  idm       : any;
  isLoading : any;
  protected app_version: string;
  tokenfcm  : any;
  cres      : any;
  ce        : any;
  time      : any;

  constructor(
    public navCtrl    : NavController,
    public navParams  : NavParams,
    public alertCtrl  : AlertController,
    public appCtrl    : App,
    public toastCtrl  : ToastController,
    public http       : Http,
    public platform   : Platform,
    public appVersion : AppVersion) {
    this.memcod   = localStorage.getItem('sesmemcode');
    this.profpic  = localStorage.getItem('sesprofpic');
    this.profmail = localStorage.getItem('sesprofmail');
    this.idm      = localStorage.getItem('sesidman');
    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        this.app_version = versionNumber;
        console.log(versionNumber)
      },
      (error) => {
        console.log(error);
      });
      this.tokenfcm = localStorage.getItem('stokenfcm');
    }

  ionViewDidLoad() {
    console.log(localStorage.getItem('sesidman'));
    console.log(localStorage.getItem('seskonv'));
    this.checkPoint(localStorage.getItem('sesidman'));
  }

  myprofile() {
    this.navCtrl.push(MyprofilePage);
  }

  shscard() {
    this.navCtrl.push(ShscardPage);
  }

  hispayment() {
    this.navCtrl.push(HispaymentPage);
  }

  feepayment() {
    this.navCtrl.push(FeepaymentPage);
  }

  hispoint() {
    this.navCtrl.push(HispointPage);
  }

  changepass() {
    this.navCtrl.push(ChangepassPage);
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  privacy() {
    this.navCtrl.push(PrivacyPage);
  }

  loginpage() {
    this.navCtrl.push(LoginPage);
  }

  logout() {
    let toast = this.toastCtrl.create({
      message: 'Successfully logged out',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    window.localStorage.removeItem('sesidman');
    window.localStorage.removeItem('seskonv');
    window.localStorage.removeItem('sesmemcode');
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  hasLogin() {
    if (localStorage.getItem('sesidman') !== null) {
      return true;
    } else if (localStorage.getItem('sesidman') === null) {
      return false;
    }
  }

  checkPoint(idman: any) {
    console.log(idman)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: idman
    };
    this.isLoading = true;
    this.http.post('https://sunholidaystyle.com/api/getpoint', data, options)
      .map(respoint => respoint.json())
      .subscribe(respoint => {
        this.dataPoint = JSON.parse(JSON.stringify(respoint));
        let dataPnt = this.dataPoint;
        if (dataPnt.status == 1) {
          this.nowPoint = dataPnt.point;
          this.profpic  = dataPnt.profpic;
          this.profmail = dataPnt.email;
          window.localStorage.setItem('sesprofpic', this.profpic);
          window.localStorage.setItem('sesprofmail', this.profmail);
          this.isLoading = false;
        } else {
          let toast = this.toastCtrl.create({
            message   : 'Sorry, Your Point not Loaded, Please Try Again',
            duration  : 3000,
            position  : 'middle',
            cssClass  : 'toastError'
          });
          toast.present();
          this.isLoading = false;
        }
      },
        error => {
          console.log(error);
          let toast = this.toastCtrl.create({
            message   : 'Sorry, Your Point not Loaded, Please Try Again',
            duration  : 3000,
            position  : 'middle',
            cssClass  : 'toastError'
          });
          toast.present();
          this.isLoading = false;
        });
  }
}