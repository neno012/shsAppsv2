import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';

/**
 * Generated class for the ShscardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shscard',
  templateUrl: 'shscard.html',
})
export class ShscardPage {
  memcod: any;
  name1: any;
  name2: any;
  acdate: any;
  exdate: any;
  dataMember: any;
  qrcode: any;
  condate: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public http: Http,
    public modalCtrl: ModalController) {
    //this.memcod = localStorage.getItem('sesmemcode');
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting you card…',
    });
    loader.present().then(() => {
    this.http.post('https://sunholidaystyle.com/api/getmember', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.dataMember = JSON.parse(JSON.stringify(res));
        if (this.dataMember.status === 1) {
          loader.dismiss();
          this.memcod = this.dataMember.data.membercode
          this.name1 = this.dataMember.data.name
          this.name2 = this.dataMember.data.namepartner
          this.acdate = this.dataMember.data.activedate
          this.exdate = this.dataMember.data.expireddate
          this.qrcode = this.dataMember.data.qrcode
          this.condate = this.dataMember.data.condate
        } else {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Your Card not loaded, Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
          loader.dismiss();
          this.navCtrl.pop();
        }
      },
        error => {
          console.log(error);
          let toast = this.toastCtrl.create({
            message: 'Sorry, Your Card not loaded, Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
          loader.dismiss();
          this.navCtrl.pop();
        });
      });
  }

  OpenImage(image: any) {
    let modal = this.modalCtrl.create('ShowqrPage', { qr: { gambar: image } })
    modal.onDidDismiss((data) => {
    })
    modal.present().then(() => {
    })
  }

  convDate(dt: any) {
    let tgl = moment(dt).format('MM/YY');
    return tgl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShscardPage');
  }

}
