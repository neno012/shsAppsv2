import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailfeepaymentPage } from '../../pages/detailfeepayment/detailfeepayment';

/**
 * Generated class for the FeepaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feepayment',
  templateUrl: 'feepayment.html',
})
export class FeepaymentPage {
  tabBarElement: any;
  listpayment: any;
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
      content: 'Getting Your History Service Fee…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/getservicefeejson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listpayment = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.listpayment.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your history service fee not available',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            this.result = this.listpayment.result;
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
    this.http.post('https://sunholidaystyle.com/api/getservicefeejson', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.listpayment = JSON.parse(JSON.stringify(res));
        event.complete();
        if (this.listpayment.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Your history service fee not available',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastWarning'
          });
          toast.present();
        } else {
          this.result = this.listpayment.result;
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
      content: 'Getting Your History Service Fee…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/getservicefeejson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listpayment = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.listpayment.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your history service fee not available',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            this.result = this.listpayment.result;
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

  showDetails(rfee: any, nfee: any, tfee: any, dfee: any) {
    var bilangan = nfee;
    var reverse = bilangan.toString().split('').reverse().join('');
    var ribuan = reverse.match(/\d{1,3}/g);
    var rupiah = ribuan.join('.').split('').reverse().join('');
    console.log(rfee)
    let data = {
      remarks: rfee,
      date: dfee,
      metode: tfee,
      price: rupiah
    }
    this.navCtrl.push(DetailfeepaymentPage, { datafeepayment: data });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeepaymentPage');
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

}
