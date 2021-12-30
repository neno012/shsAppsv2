import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { Flightresult2Page } from '../../pages/flightresult2/flightresult2';
import { Getflight2Page } from '../../pages/getflight2/getflight2';

/**
 * Generated class for the FlightresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flightresult',
  templateUrl: 'flightresult.html',
})
export class FlightresultPage {
  jsonflight: any;
  depjsonflight: any;
  konv: any;
  tabBarElement: any;
  adult: any;
  child: any;
  infant: any;
  depc: any;
  arrc: any;
  itemFamily: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.jsonflight = JSON.parse(JSON.stringify(navParams.get('jsonflight')));
    this.adult = localStorage.getItem('seradult');
    this.child = localStorage.getItem('serchild');
    this.infant = localStorage.getItem('serinfant');
    //console.log(localStorage.getItem('serdatedep'))
    this.depc = window.localStorage.getItem('serdep');
    this.arrc = window.localStorage.getItem('serarr');

    if (this.jsonflight.data.searchList.departureFlights.length === 0) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Please Try Your Search Again',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
      this.navCtrl.pop();
    } else {
      this.depjsonflight = this.jsonflight.data.searchList.departureFlights;
      this.depjsonflight.sort(function (a, b) {
        return a.fareDetail.cheapestFare - b.fareDetail.cheapestFare;
      });
    }
    if (this.jsonflight.data.searchList.departureFlights[0].international === true) {
      window.localStorage.setItem('sespaspor', 'ya');
    } else if (this.jsonflight.data.searchList.departureFlights[0].international === false) {
      window.localStorage.setItem('sespaspor', 'tidak');
    }
    // if (this.jsonflight.data.searchList.departureFlights[0].departure.countryCode !== 'ID' || this.jsonflight.data.searchList.departureFlights[0].arrival.countryCode !== 'ID') {
    //   window.localStorage.setItem('sespaspor', 'ya');
    // } else {
    //   window.localStorage.setItem('sespaspor', 'tidak');
    // }
    console.log(window.localStorage.getItem('sespaspor'))
    if (localStorage.getItem('seskonv') === undefined || localStorage.getItem('seskonv') === '' || localStorage.getItem('seskonv') === null) {
      this.konv = 6705;
    } else {
      this.konv = localStorage.getItem('seskonv');
    }
    //console.log(localStorage.getItem('sertoken'));
  }

  openModalFilter() {
    console.log("ggg");
    let modal = this.modalCtrl.create("FlightresultfilterPage");
    console.log("ggg 2");
    modal.onDidDismiss((data) => {
    })
    modal.present().then(() => {
    })
  }

  reSearch(event) {

    //// check to confirm the username and password fields are filled
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('seridman'),
      dep: localStorage.getItem('serdep'),
      arr: localStorage.getItem('serarr'),
      deptype: localStorage.getItem('serdeptype'),
      arrtype: localStorage.getItem('serarrtype'),
      datedep: localStorage.getItem('serdatedep'),
      datearr: localStorage.getItem('serdatearr'),
      adult: localStorage.getItem('seradult'),
      child: localStorage.getItem('serchild'),
      infant: localStorage.getItem('serinfant'),
      cabinclass: localStorage.getItem('sercabinclass'),
      searchtype: localStorage.getItem('sersearchtype'),
      token: localStorage.getItem('sertoken')
    };
    this.http.post('https://sunholidaystyle.com/api/searchflightjsonv2', data, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res)
        //this.jsonflight = JSON.parse(JSON.stringify(res));
        this.jsonflight = res;
        console.log(this.jsonflight)
        if (this.jsonflight.data.searchList.departureFlights.length === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Please Try Your Search Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastWarning'
          });
          toast.present();
          event.complete();
        } else {
          this.depjsonflight = this.jsonflight.data.searchList.departureFlights;
          this.depjsonflight.sort(function (a, b) {
            return a.fareDetail.cheapestFare - b.fareDetail.cheapestFare;
          });
          if (this.jsonflight.data.searchList.departureFlights[0].international === true) {
            window.localStorage.setItem('sespaspor', 'ya');
          } else if (this.jsonflight.data.searchList.departureFlights[0].international === false) {
            window.localStorage.setItem('sespaspor', 'tidak');
          }
          // if (this.jsonflight.data.searchList.departureFlights[0].departure.countryCode !== 'ID' || this.jsonflight.data.searchList.departureFlights[0].arrival.countryCode !== 'ID') {
          //   window.localStorage.setItem('sespaspor', 'ya');
          // } else {
          //   window.localStorage.setItem('sespaspor', 'tidak');
          // }
          console.log(window.localStorage.getItem('sespaspor'))
          event.complete();
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
        });
  }

  cekID(idd: any, sid: any, crd: any, tfd: any, ddd: any, ddd2: any, dad: any, dad2: any, and: any, fnd: any, fvd: any, fvd2: any, fvd3: any, fvd4: any, fvd5: any, fvd6: any) {
    //console.log(idd + ' ' + sid + ' ' + crd + ' ' + tfd + ' ' + ddd + ' ' + ddd2 + ' ' + dad + ' ' + dad2 + ' ' + and + ' ' + fnd + ' ' + fvd + ' ' + fvd2 + ' ' + fvd3 + ' ' + fvd4 + ' ' + fvd5 + ' ' + fvd6)
    window.localStorage.setItem('sesidd', idd);
    window.localStorage.setItem('sessid', sid);
    window.localStorage.setItem('sescrd', crd);
    window.localStorage.setItem('sestfd', tfd);
    window.localStorage.setItem('sesddd', ddd + ' ' + ddd2);
    window.localStorage.setItem('sesdad', dad + ' ' + dad2);
    window.localStorage.setItem('sesand', and);
    window.localStorage.setItem('sesfnd', fnd);
    window.localStorage.setItem('sesfvd', fvd2 + '(' + ddd2 + ') -> ' + fvd5 + '(' + dad2 + ')');
    window.localStorage.setItem('sessq', this.jsonflight.search_queries);
    if (localStorage.getItem('sersearchtype') == 'ONE_WAY') {
      localStorage.removeItem('sesida');
      localStorage.removeItem('sessia');
      localStorage.removeItem('sescra');
      localStorage.removeItem('sestfa');
      localStorage.removeItem('sesdda');
      localStorage.removeItem('sesdaa');
      localStorage.removeItem('sesana');
      localStorage.removeItem('sesfna');
      localStorage.removeItem('sesfva');
      this.navCtrl.push(Getflight2Page, {
        jsonflight: this.jsonflight
      });
    } else if (localStorage.getItem('sersearchtype') == 'ROUND_TRIP') {
      localStorage.removeItem('sesida');
      localStorage.removeItem('sessia');
      localStorage.removeItem('sescra');
      localStorage.removeItem('sestfa');
      localStorage.removeItem('sesdda');
      localStorage.removeItem('sesdaa');
      localStorage.removeItem('sesana');
      localStorage.removeItem('sesfna');
      localStorage.removeItem('sesfva');
      this.navCtrl.push(Flightresult2Page, {
        jsonflight: this.jsonflight
      });
    }
  }

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