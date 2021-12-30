import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {
  tabBarElement: any;
  oldpas: any;
  newpas: any;
  confnewpas: any;
  dataPass: any;
  private isShow: boolean = false;
  private typeInput: string = 'password'

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public appCtrl: App,
    public loading: LoadingController,
    public http: Http) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

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

  changePassword() {
    if (this.oldpas === "" || this.oldpas === null || this.oldpas === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, Old Password field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.newpas === "" || this.newpas === null || this.newpas === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, New Password field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.confnewpas === "" || this.confnewpas === null || this.confnewpas === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, Confirm New Password field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.newpas !== this.confnewpas) {
      let toast = this.toastCtrl.create({
        message: 'Attention, New Password And Confirm New Password is Not Same',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else {
      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let data = {
        oldpas: this.oldpas,
        newpas: this.newpas,
        confnewpas: this.confnewpas,
        idman: localStorage.getItem('sesidman')
      };
      console.log(data)
      let loader = this.loading.create({
        content: 'Processing please wait…',
      });
      loader.present().then(() => {
        this.http.post('https://sunholidaystyle.com/api/changepassjson', data, options)
          .map(res => res.json())
          .subscribe(res => {
            console.log(res)
            this.dataPass = JSON.parse(JSON.stringify(res));
            let dataPs = this.dataPass;
            loader.dismiss()
            if (dataPs.status == 1) {
              let toast = this.toastCtrl.create({
                message: 'Your Password Has Been Changed',
                duration: 3000,
                position: 'middle',
                cssClass: 'toastSuccess'
              });
              toast.present();
              this.appCtrl.getRootNav().setRoot(HomePage);
            } else {
              let toast = this.toastCtrl.create({
                message: 'Failed, ' + (dataPs.message),
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
}
