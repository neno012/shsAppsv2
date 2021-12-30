import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as momenttimezone from 'moment-timezone';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the MyorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
  loader: any;
  tabBarElement: any;
  listorder: any;
  status: any;
  results: any;
  todayDate: any
  //todayDate2: any
  konv: any;
  idm: any;
  token: any;
  dinv: FormGroup;
  stic: FormGroup;
  dtic: FormGroup;
  dord: FormGroup;
  cord: FormGroup;
  iord: FormGroup;
  invo: any;
  etick: any;
  imel: any;
  issued: any;
  checkoutData: any;
  deleteData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public platform: Platform) {
    //this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    //this.todayDate = new Date();
    //this.todayDate = moment(this.todayDate).format('YYYY-MM-DD HH:mm:ss');
    this.todayDate = momenttimezone.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    console.log(this.todayDate);
    this.konv = localStorage.getItem('seskonv');
    this.idm = localStorage.getItem('sesidman');
    this.token = localStorage.getItem('sestkn');
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting Your Order Data…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/myorderjsonv2', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listorder = JSON.parse(JSON.stringify(res));
          this.status = this.listorder.status;
          this.results = this.listorder.results;
          loader.dismiss()
          if (this.listorder.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2s081), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          } else {

          }
        },
          error => {
            loader.dismiss();
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err95), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
            this.reSearch1();
          });
    });
  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
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
    this.http.post('https://sunholidaystyle.com/api/myorderjsonv2', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.listorder = JSON.parse(JSON.stringify(res));
        this.status = this.listorder.status;
        this.results = this.listorder.results;
        event.complete();
        if (this.listorder.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Internal Server Error (moxmj2es0128), Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
        } else {

        }
      },
        error => {
          event.complete();
          console.log(error);
          let toast = this.toastCtrl.create({
            message: 'Sorry, Internal Server Error (moxmj2err142), Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
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
      content: 'Getting Your Order Data…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/myorderjsonv2', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listorder = JSON.parse(JSON.stringify(res));
          this.status = this.listorder.status;
          this.results = this.listorder.results;
          loader.dismiss()
          //event.complete();
          if (this.listorder.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2s0174), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          } else if (this.listorder.status === 3) {
            let toast = this.toastCtrl.create({
              message: "Sorry, You Don't Have Any Order",
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {

          }
        },
          error => {
            loader.dismiss()
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err196), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  convDate(dt: any) {
    let tgl = moment(dt).format('DD MMMM YYYY');
    return tgl;
  }

  convDatetime(dt: any) {
    let tgl = moment(dt).format('DD MMMM YYYY HH:mm:ss');
    return tgl;
  }

  downInvoice(sidm: any, sodi: any, soi: any, skonv: any, sbcode: any) {
    console.log(sidm + ' ' + sodi + ' ' + soi + ' ' + skonv + ' ' + sbcode)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idm: sidm,
      odi: sodi,
      oi: soi,
      konv: skonv,
      bcode: sbcode
    }
    let loader = this.loading.create({
      content: 'Download Invoice…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/downinvoicejson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.invo = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.invo.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your Invoice Failed To Download, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            window.open(this.invo.url, '_system')
          }
        },
          error => {
            loader.dismiss();
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err255), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  sentEticket(sidm: any, sodi: any, soi: any, skonv: any) {
    console.log(sidm + ' ' + sodi + ' ' + soi + ' ' + skonv)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data =
    {
      idm: sidm,
      odi: sodi,
      oi: soi,
      konv: skonv
    }
    let loader = this.loading.create({
      content: 'Sent E-Ticket…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/sentmailjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.imel = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          console.log(res)
          if (this.imel.status === 0) {
            let toast = this.toastCtrl.create({
              message: "Sorry, Can't Sent To Your Email , Please Try Again",
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: "Success, Sent To Your Email",
              duration: 3000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
          }
        },
          error => {
            loader.dismiss();
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err311), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  sentInvoice(sidm: any, sodi: any, soi: any, skonv: any) {
    console.log(sidm + ' ' + sodi + ' ' + soi + ' ' + skonv)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data =
    {
      idm: sidm,
      odi: sodi,
      oi: soi,
      konv: skonv
    }
    let loader = this.loading.create({
      content: 'Sent Invoice…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/sentmailinvoicejson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.imel = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          console.log(res)
          if (this.imel.status === 0) {
            let toast = this.toastCtrl.create({
              message: "Sorry, Can't Sent To Your Email , Please Try Again",
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: "Success, Sent To Your Email",
              duration: 3000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
          }
        },
          error => {
            loader.dismiss();
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err367), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  downEticket(sidm: any, sodi: any, soi: any, skonv: any, sbcode: any) {
    console.log(sidm + ' ' + sodi + ' ' + soi + ' ' + skonv + ' ' + sbcode)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idm: sidm,
      odi: sodi,
      oi: soi,
      konv: skonv,
      bcode: sbcode
    }
    let loader = this.loading.create({
      content: 'Download E-Ticket…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/downeticketjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.etick = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.etick.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your E-Ticket Failed To Download, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            window.open(this.etick.url, '_system')
          }
        },
          error => {
            loader.dismiss();
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err416), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  delOrder(soi: any, stk: any) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      oi: soi,
      token: stk
    };
    let loader = this.loading.create({
      content: 'Deleted Your order…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/deleteorderjsonv2', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          this.deleteData = JSON.parse(JSON.stringify(res));
          if (this.deleteData.status === 1) {
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Success, Your Order Has Been Deleted',
              duration: 5000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
            this.reSearch1();
          } else {
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Sorry, ' + (this.deleteData.message),
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
              message: 'Sorry, Internal Server Error (moxmj2err470), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  checkOrder(soi: any, stk: any) {
    console.log(soi, stk)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      orderid: soi,
      token: stk
    };
    let loader = this.loading.create({
      content: 'Checkout Your Flight…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/checkoutflightjsonv2', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          this.checkoutData = JSON.parse(JSON.stringify(res));
          if (this.checkoutData.status === 1) {
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Success, Your Flight Has Been Checkout, Please Check Your Order To Issued',
              duration: 5000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
            this.reSearch1();
          } else {
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Sorry, ' + (this.checkoutData.message),
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
              message: 'Sorry, Internal Server Error (moxmj2err525), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  issOrder(soi: any, sidm: any, skonv: any, stoken: any, sprice: any) {
    console.log(soi + ' ' + sidm + ' ' + skonv + ' ' + stoken + ' ' + sprice)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      oi: soi,
      idm: sidm,
      konv: skonv,
      token: stoken,
      price: sprice
    }
    let loader = this.loading.create({
      content: 'Request to issued…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/issuedjsonv2', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.issued = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          console.log(res)
          if (this.issued.status === 0) {
            let toast = this.toastCtrl.create({
              message: (this.issued.message),
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          } else if (this.issued.status === 1) {
            let toast = this.toastCtrl.create({
              message: (this.issued.message),
              duration: 3000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
            this.reSearch1();
          }
        },
          error => {
            loader.dismiss();
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error (moxmj2err582), Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderPage');
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

}
