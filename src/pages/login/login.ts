import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App, ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  memcod: any;
  mempas: any;
  tokenfcm: any;

  data: string;
  dataLogin: any;
  dataForgot: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public loading: LoadingController,
    public appCtrl: App,
    public toastCtrl: ToastController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tokenfcm = localStorage.getItem('stokenfcm');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  private isShow: boolean = false;
  private typeInput: string = 'password'

  showHidePass() {
    this.isShow = !this.isShow;

    if (this.typeInput === 'password') {
      this.typeInput = 'text';
    } else {
      this.typeInput = 'password';
    }
  }

  toggleColor(): string {
    if (this.isShow)
      return 'eye';
    else
      return 'eye-off';
  }

  signIn() {
    //// check to confirm the username and password fields are filled 
    if (this.memcod === "" || this.memcod === null || this.memcod === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, Member Code field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.mempas === "" || this.mempas === null || this.mempas === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, Password field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    }
    else {
      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let data = {
        memcod: this.memcod,
        mempas: this.mempas,
        fcmtoken: localStorage.getItem('stokenfcm')
      };
      let loader = this.loading.create({
        content: 'Processing please wait…',
      });
      loader.present().then(() => {
        this.http.post('https://sunholidaystyle.com/api/loginjson', data, options)
          .map(res => res.json())
          .subscribe(res => {
            console.log(res)
            this.dataLogin = JSON.parse(JSON.stringify(res));
            let dataLgn = this.dataLogin;
            loader.dismiss()
            if (dataLgn.status == 1) {
              let toast = this.toastCtrl.create({
                message: 'Successfully logged in',
                duration: 3000,
                position: 'middle',
                cssClass: 'toastSuccess'
              });
              toast.present();
              window.localStorage.setItem('sesidman', dataLgn.idman);
              window.localStorage.setItem('seskonv', dataLgn.konv);
              window.localStorage.setItem('sesmemcode', dataLgn.memcode);
              window.localStorage.setItem('sesprofpic', dataLgn.img);
              window.localStorage.setItem('sesprofmail', dataLgn.email);
              window.localStorage.setItem('sescondate', dataLgn.condate);
              this.appCtrl.getRootNav().setRoot(HomePage);
            } else {
              let toast = this.toastCtrl.create({
                message: 'Failed, ' + (dataLgn.message),
                duration: 3000,
                position: 'middle',
                cssClass: 'toastError'
              });
              toast.present();
            }
          },
            error => {
              loader.dismiss();
              console.log(error);
              let toast = this.toastCtrl.create({
                message: 'Sorry, Internal Server Error, Please Try Again',
                duration: 3000,
                position: 'middle',
                cssClass: 'toastError'
              });
              toast.present();
            });
      });
    }
  }

  forgotPassword() {
    let alert = this.alertCtrl.create({
      title: 'Input Your Email',
      cssClass: 'alertDanger',
      inputs: [
        {
          name: 'email',
          placeholder: 'email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: dataemail => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sent Password',
          handler: dataemail => {
            if (dataemail.email != null || dataemail.email != '') {
              console.log('data')
              console.log(dataemail.email)
              var headerss = new Headers();
              headerss.append('Accept', 'application/json');
              headerss.append('Content-Type', 'application/json');
              let optionss = new RequestOptions({ headers: headerss });
              let datamail = {
                email: dataemail.email
              };
              let loader = this.loading.create({
                content: 'Processing please wait…',
              });
              loader.present().then(() => {
                this.http.post('https://sunholidaystyle.com/forgotmailjson', datamail, optionss)
                  .map(res => res.json())
                  .subscribe(res => {
                    console.log(res)
                    this.dataForgot = JSON.parse(JSON.stringify(res));
                    let dataFgt = this.dataForgot;
                    loader.dismiss();
                    if (dataFgt.status == 1) {
                      let toast = this.toastCtrl.create({
                        message: 'Successfully sent password to your mail',
                        duration: 3000,
                        position: 'middle',
                        cssClass: 'toastSuccess'
                      });
                      toast.present();
                      this.appCtrl.getRootNav().setRoot(HomePage);
                    } else {
                      let toast = this.toastCtrl.create({
                        message: 'Failed, ' + (dataFgt.message),
                        duration: 3000,
                        position: 'middle',
                        cssClass: 'toastError'
                      });
                      toast.present();
                    }
                  },
                    error => {
                      loader.dismiss();
                      console.log(error);
                      let toast = this.toastCtrl.create({
                        message: 'Sorry, Internal Server Error, Please Try Again',
                        duration: 3000,
                        position: 'middle',
                        cssClass: 'toastError'
                      });
                      toast.present();
                    });
              });
            } else {
              console.log('no data')
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

}
