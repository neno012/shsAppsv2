import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, /*Headers, RequestOptions */} from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

/**
 * Generated class for the TrainresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trainresult',
  templateUrl: 'trainresult.html',
})
export class TrainresultPage {
  jsonflight: any;
  depjsonflight: any;
  konv: any;
  tabBarElement: any;
  adult: any;
  child: any;
  infant: any;
  depc: any;
  arrc: any;
  depdate: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController) {
      
    this.tabBarElement  = document.querySelector('.tabbar.show-tabbar');
    this.jsonflight     = JSON.parse(JSON.stringify(navParams.get('jsonflight')));
    this.adult          = localStorage.getItem('seradult');
    this.child          = localStorage.getItem('serchild');
    this.infant         = localStorage.getItem('serinfant');
    this.depdate        = localStorage.getItem('serdatedep');
    // console.log(localStorage.getItem('serdatedep'))
    console.log("testtttt");
    console.log(this.jsonflight);
    this.depc           = window.localStorage.getItem('serdep');
    this.arrc           = window.localStorage.getItem('serarr');

    if (this.jsonflight.departures.length === 0) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Please Try Your Search Again',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
      this.navCtrl.pop();
    } else {
      this.depjsonflight = this.jsonflight.departures.result;
    }
    if (localStorage.getItem('seskonv') === undefined || localStorage.getItem('seskonv') === '' || localStorage.getItem('seskonv') === null) {
      this.konv = 6705;
    } else {
      this.konv = localStorage.getItem('seskonv');
    }
    console.log(localStorage.getItem('seskonv'));
    console.log(this.depjsonflight);
  }

  // cekID(idd: any, sid: any, crd: any, tfd: any, ddd: any, ddd2: any, dad: any, dad2: any, and: any, fnd: any, fvd: any, fvd2: any, fvd3: any, fvd4: any, fvd5: any, fvd6: any) {
  //   //console.log(idd + ' ' + sid + ' ' + crd + ' ' + tfd + ' ' + ddd + ' ' + ddd2 + ' ' + dad + ' ' + dad2 + ' ' + and + ' ' + fnd + ' ' + fvd + ' ' + fvd2 + ' ' + fvd3 + ' ' + fvd4 + ' ' + fvd5 + ' ' + fvd6)
  //   window.localStorage.setItem('sesidd', idd);
  //   window.localStorage.setItem('sessid', sid);
  //   window.localStorage.setItem('sescrd', crd);
  //   window.localStorage.setItem('sestfd', tfd);
  //   window.localStorage.setItem('sesddd', ddd + ' ' + ddd2);
  //   window.localStorage.setItem('sesdad', dad + ' ' + dad2);
  //   window.localStorage.setItem('sesand', and);
  //   window.localStorage.setItem('sesfnd', fnd);
  //   window.localStorage.setItem('sesfvd', fvd2 + '(' + ddd2 + ') -> ' + fvd5 + '(' + dad2 + ')');
  //   window.localStorage.setItem('sessq', this.jsonflight.search_queries);
  //   if (localStorage.getItem('sersearchtype') == 'ONE_WAY') {
  //     localStorage.removeItem('sesida');
  //     localStorage.removeItem('sessia');
  //     localStorage.removeItem('sescra');
  //     localStorage.removeItem('sestfa');
  //     localStorage.removeItem('sesdda');
  //     localStorage.removeItem('sesdaa');
  //     localStorage.removeItem('sesana');
  //     localStorage.removeItem('sesfna');
  //     localStorage.removeItem('sesfva');
  //     this.navCtrl.push(Getflight2Page, {
  //       jsonflight: this.jsonflight
  //     });
  //   } else if (localStorage.getItem('sersearchtype') == 'ROUND_TRIP') {
  //     localStorage.removeItem('sesida');
  //     localStorage.removeItem('sessia');
  //     localStorage.removeItem('sescra');
  //     localStorage.removeItem('sestfa');
  //     localStorage.removeItem('sesdda');
  //     localStorage.removeItem('sesdaa');
  //     localStorage.removeItem('sesana');
  //     localStorage.removeItem('sesfna');
  //     localStorage.removeItem('sesfva');
  //     this.navCtrl.push(Flightresult2Page, {
  //       jsonflight: this.jsonflight
  //     });
  //   }
  // }

  convChar(oke: any) {
    return oke.toLowerCase();
  }

  getTime(tm: any) {
    var num = tm;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightresultPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  convDate(dt: any) {
    let tgl = moment(dt).format('DD MMMM YYYY');
    return tgl;
  }

}
