import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ChangemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changemail',
  templateUrl: 'changemail.html',
})
export class ChangemailPage {

  tabBarElement: any;
  oldmail: any;
  newmail: any;
  confnewmail: any;
  dataMail: any;
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

  changeEmail() {
    if (this.oldmail === "" || this.oldmail === null || this.oldmail === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, Old Email field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.newmail === "" || this.newmail === null || this.newmail === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, New Email field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.confnewmail === "" || this.confnewmail === null || this.confnewmail === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Attention, Confirm New Email field is empty',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.newmail !== this.confnewmail) {
      let toast = this.toastCtrl.create({
        message: 'Attention, New Email And Confirm New Email is Not Same',
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
        oldmail: this.oldmail,
        newmail: this.newmail,
        confnewmail: this.confnewmail,
        idman: localStorage.getItem('sesidman')
      };
      console.log(data)
      let loader = this.loading.create({
        content: 'Processing please wait…',
      });
      loader.present().then(() => {
        this.http.post('https://sunholidaystyle.com/api/changemailjson', data, options)
          .map(res => res.json())
          .subscribe(res => {
            console.log(res)
            this.dataMail = JSON.parse(JSON.stringify(res));
            let dataMl = this.dataMail;
            loader.dismiss()
            if (dataMl.status == 1) {
              let toast = this.toastCtrl.create({
                message: 'Your Email Has Been Changed',
                duration: 3000,
                position: 'middle',
                cssClass: 'toastSuccess'
              });
              toast.present();
              this.appCtrl.getRootNav().setRoot(HomePage);
            } else {
              let toast = this.toastCtrl.create({
                message: 'Failed, ' + (dataMl.message),
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
