import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DiscountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discount',
  templateUrl: 'discount.html',
})
export class DiscountPage {
  tabBarElement: any;
  listmerchant: any;
  result: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting Data…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/merchantjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listmerchant = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.listmerchant.status === 0) {
            let toast = this.toastCtrl.create({
              message: this.listmerchant.message,
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            this.result = this.listmerchant.result;
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
    this.http.post('https://sunholidaystyle.com/api/merchantjson', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.listmerchant = JSON.parse(JSON.stringify(res));
        event.complete();
        if (this.listmerchant.status === 0) {
          let toast = this.toastCtrl.create({
            message: this.listmerchant.message,
            duration: 3000,
            position: 'middle',
            cssClass: 'toastWarning'
          });
          toast.present();
        } else {
          this.result = this.listmerchant.result;
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
      content: 'Getting Data…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/merchantjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listmerchant = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.listmerchant.status === 0) {
            let toast = this.toastCtrl.create({
              message: this.listmerchant.message,
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            this.result = this.listmerchant.result;
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

  OpenImage(name: any, discount: any, image: any, address: any, lat: any, lon: any) {
    let modal = this.modalCtrl.create('ShowimagePage', { disc: { nama: name, diskon: discount, gambar: image, alamat: address, latt: lat, long: lon } })
    modal.onDidDismiss((data) => {
    })
    modal.present().then(() => {
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscountPage');
  }
}
