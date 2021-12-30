import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../../pages/home/home';
// import { FlightPage } from '../../pages/flight/flight';
import { MyorderPage } from '../../pages/myorder/myorder';

/**
 * Generated class for the PrevflightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prevflight',
  templateUrl: 'prevflight.html',
})
export class PrevflightPage {
  tabBarElement: any;
  prevflightData: any;
  myorder: any;
  myresult: any;
  konv: any;
  check: any;
  orderid: any;
  checkflightData: any;
  token: any;
  deleteData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appCtrl: App) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.prevflightData = navParams.get('prevflightData');
    this.myorder = this.prevflightData.result.myorder.data;
    this.myresult = this.prevflightData.result;
    this.konv = localStorage.getItem('seskonv');
    this.orderid = this.prevflightData.result.myorder.order_id;
    this.token = this.prevflightData.result.token;
  }

  checkoutForm() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      orderid: this.orderid,
      token: this.token
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
          this.checkflightData = JSON.parse(JSON.stringify(res));
          if (this.checkflightData.status === 1) {
            loader.dismiss();
            const alert = this.alertCtrl.create({
              cssClass: 'alertDanger',
              title: '<center>Success</center>',
              message: 'Success, Your Flight Has Been Checkout, Please Check Your Order To Issued',
              buttons: [{
                  text: 'Continue to Issued',
                  handler: () => {
                    this.MyorderPage();
                  }
              }]
          });
          alert.present();
          } else {
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Sorry, ' + (this.checkflightData.message),
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

  deleteForm() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      oi: this.orderid,
      token: this.token
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
            this.navCtrl.setRoot(HomePage);
            // this.navCtrl.push(HomePage);
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
              message: 'Sorry, Internal Server Error, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
    });
  }

  resjson(js: any) {
    let jso = JSON.parse(js);
    var collections = [];
    for (let dt of jso) {
      collections.push(dt.flight_number + ' (' + dt.origin + '-' + dt.destination + ') ' + dt.unit + '' + dt.measurement);
    }
    return collections;
  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrevflightPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  MyorderPage() {
    this.navCtrl.push(MyorderPage);
  }

}
