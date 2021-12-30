import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailpointPage } from '../../pages/detailpoint/detailpoint';

/**
 * Generated class for the HispointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hispoint',
  templateUrl: 'hispoint.html',
})
export class HispointPage {
  tabBarElement: any;
  listhistory: any;
  result: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting Your History Point…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/gethispointjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listhistory = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.listhistory.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, your history point not available',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            this.result = this.listhistory.result;
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
            this.reSearch1();
          });
    });
  }

  reSearch(event) {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    console.log(data);
    this.http.post('https://sunholidaystyle.com/api/gethispointjson', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.listhistory = JSON.parse(JSON.stringify(res));
        event.complete();
        if (this.listhistory.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, your history point not available',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastWarning'
          });
          toast.present();
        } else {
          this.result = this.listhistory.result;
        }
      },
        error => {
          event.complete();
          console.log(error);
          let toast = this.toastCtrl.create({
            message: 'Sorry, Internal Server Error, Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
          this.reSearch1();
        });
  }

  reSearch1() {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting Your History Point…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/gethispointjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listhistory = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.listhistory.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, your history point not available',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            this.result = this.listhistory.result;
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
            this.reSearch1();
          });
    });
  }

  showDetails(rhis: any, dhis: any, shis: any, uhis: any, ehis: any) {
    let data = {
      remarks: rhis,
      date: dhis,
      startpoint: shis,
      usepoint: uhis,
      endpoint: ehis
    }
    this.navCtrl.push(DetailpointPage, { datapoint: data });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HispointPage');
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

}
