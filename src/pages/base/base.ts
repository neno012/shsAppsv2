// import { TrainsearchPage } from './../trainsearch/trainsearch';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController, Platform, AlertController, ModalController, Nav, /*App*/ } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppVersion } from '@ionic-native/app-version';
import * as moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Market } from '@ionic-native/market/ngx';

import { FlightPage } from '../../pages/flight/flight';
import { HotelPage } from '../../pages/hotel/hotel';
import { TrainsearchPage} from '../../pages/trainsearch/trainsearch';
import { ActivitysearchPage } from '../../pages/activitysearch/activitysearch';



/**
 * Generated class for the BasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-base',
  templateUrl: 'base.html',
})
export class BasePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Nav) nav: Nav;
  listbanner: any;
  aplversion: string;
  versi: any;
  banner: any;
  testi: any;
  tour: any;
  foto: any;
  public hotelcode: string = '';
  public hotelname: string = '';
  listmerchant: any;
  result: any;
  notif: any;
  version: any;
  app_version: any;
  versionNumber: any;
  force: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    //private appVersion: AppVersion,
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
    public appVersion: AppVersion,
    // public market: Market,
    public platform: Platform) {
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

    this.http.get('https://sunholidaystyle.com/api/banner')
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res)
        this.listbanner = JSON.parse(JSON.stringify(res));
        this.banner = this.listbanner.banner;
        this.testi = this.listbanner.testi;
        this.tour = this.listbanner.tour;
        this.foto = this.listbanner.foto;
      },
        error => {
          console.log(error);
        });
        //#region discount
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let data = {
          idman: localStorage.getItem('sesidman')
        };
        
        this.http.post('https://sunholidaystyle.com/api/merchantjsonforhome', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listmerchant = JSON.parse(JSON.stringify(res));
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
            console.log(this.listmerchant.result);
          }
        },
          error => {
            console.log(error);
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          });
          // NOTIFICATION FOR UPDATE APPLICATION
          this.http.get('https://sunholidaystyle.com/api/notif-update.php')
          .map(res => res.json())
          .subscribe(res => {
            // console.log(res);
            this.notif    = JSON.parse(JSON.stringify(res));
            this.version  = this.notif.result.new_version;
            this.force    = this.notif.result.foce_update
            console.log(this.version);
            if (this.version !== '1.0.24' && this.force !== '1') { // THIS APPLICATION VERSION
              const alert = this.alertCtrl.create({
                title: 'New Version Available',
                message: 'Please, update app to new version.',
                cssClass: 'alertDanger',
                buttons: [{
                    text: 'No, Thanks',
                    role: 'no',
                },{
                    text: 'Update',
                    handler: () => {
                      window.open('https://play.google.com/store/apps/details?id=com.sunholidaystyle.shs&hl=en', '_system');
                    }
                }]
            });
            alert.present();
            } else if(this.version !== '1.0.24' && this.force === '1') { // THIS APPLICATION VERSION
              const alert = this.alertCtrl.create({
                title: 'New Version Available',
                message: 'Please, update app to new version.',
                cssClass: 'alertDanger',
                buttons: [{
                    text: 'Update',
                    handler: () => {
                      window.open('https://play.google.com/store/apps/details?id=com.sunholidaystyle.shs&hl=en', '_system');
                    }
                }]
            });
            alert.present();
            }  else {
              this.navCtrl.pop();
            }
          },
          error => {
            console.log(error);
          });
          
          
        //#endregion
        
        
  }

  OpenImage(name: any, discount: any, image: any, address: any, lat: any, lon: any) {
    let modal = this.modalCtrl.create('ShowimagePage', { disc: { nama: name, diskon: discount, gambar: image, alamat: address, latt: lat, long: lon } })
    modal.onDidDismiss((data) => {
    })
    modal.present().then(() => {
    })
  }
  exitApp() {
    this.platform.exitApp();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BasePages');
  }

  flight() {
    this.navCtrl.push(FlightPage);
  }

  hotel() {
    this.navCtrl.push(HotelPage);
  }

  trainseach() {
    this.navCtrl.push(TrainsearchPage);
  }

  activityseach() {
    this.navCtrl.push(ActivitysearchPage);
  }

  hasLogin() {
    if (localStorage.getItem('sesidman') !== null) {
      return true;
    } else if (localStorage.getItem('sesidman') === null) {
      return false;
    }
  }

  showtour(url: any) {
    console.log(url)
    if (url === 'undefined' || url === null || url === '') {
      let alert = this.alertCtrl.create({
        message: 'Sorry, Tour Detail Not Available Right Now',
        cssClass: 'alertDanger',
        buttons: [{
          text: 'OK',
        }]
      });
      alert.present();
    } else {
      this.platform.ready().then(() => {
        let browser = this.iab.create(url, '_self', { location: 'no' });
        browser.show();
      });
    }
  }
}
