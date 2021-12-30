import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { Getflight2Page } from '../../pages/getflight2/getflight2';

/**
 * Generated class for the Flightresult2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flightresult2',
  templateUrl: 'flightresult2.html',
})
export class Flightresult2Page {
  jsonflight: any;
  retjsonflight: any;
  airnam: any;
  flinum: any;
  depdate: any;
  fulvia: any;
  adult: any;
  child: any;
  infant: any;
  konv: any;
  tabBarElement: any;
  depc: any;
  arrc: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.adult = localStorage.getItem('seradult');
    this.child = localStorage.getItem('serchild');
    this.infant = localStorage.getItem('serinfant');
    this.depdate = localStorage.getItem('serdatedep');
    //console.log(localStorage.getItem('serdatedep'))
    localStorage.removeItem('sesida');
    localStorage.removeItem('sesdda');
    localStorage.removeItem('sesdaa');
    localStorage.removeItem('sesana');
    localStorage.removeItem('sesfna');
    localStorage.removeItem('sesfva');
    localStorage.removeItem('sessq');
    this.jsonflight = JSON.parse(JSON.stringify(navParams.get('jsonflight')));
    this.depc = window.localStorage.getItem('serdep');
    this.arrc = window.localStorage.getItem('serarr');
    if (this.jsonflight.data.searchList.returnFlights.length === 0) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Your Return Flight Not Available, Please Try Again',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
      this.retjsonflight = undefined;
    } else {
      this.retjsonflight = this.jsonflight.data.searchList.returnFlights;
      this.retjsonflight.sort(function (a, b) {
        return a.fareDetail.cheapestFare - b.fareDetail.cheapestFare;
      });
    }
    if (localStorage.getItem('seskonv') === undefined || localStorage.getItem('seskonv') === '' || localStorage.getItem('seskonv') === null) {
      this.konv = 6705;
    } else {
      this.konv = localStorage.getItem('seskonv');
    }
    this.airnam = localStorage.getItem('sesand');
    this.flinum = localStorage.getItem('sesfnd');
    this.fulvia = localStorage.getItem('sesfvd')
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
        if (this.jsonflight.data.searchList.returnFlights.length === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Please Try Your Search Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastWarning'
          });
          toast.present();
          this.retjsonflight = undefined;
          event.complete();
        } else {
          this.retjsonflight = this.jsonflight.data.searchList.returnFlights;
          this.retjsonflight.sort(function (a, b) {
            return a.fareDetail.cheapestFare - b.fareDetail.cheapestFare;
          });
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
          this.retjsonflight = undefined;
        });
  }

  cekID(ida: any, sia: any, cra: any, tfa: any, dda: any, dda2: any, daa: any, daa2: any, ana: any, fna: any, fva: any, fva2: any, fva3: any, fva4: any, fva5: any, fva6: any) {
    //console.log(ida + ' ' + sia + ' ' + cra + ' ' + tfa + ' ' + dda + ' ' + dda2 + ' ' + daa + ' ' + daa2 + ' ' + ana + ' ' + fna + ' ' + fva + ' ' + fva2 + ' ' + fva3 + ' ' + fva4 + ' ' + fva5 + ' ' + fva6)
    window.localStorage.setItem('sesida', ida);
    window.localStorage.setItem('sessia', sia);
    window.localStorage.setItem('sescra', cra);
    window.localStorage.setItem('sestfa', tfa);
    window.localStorage.setItem('sesdda', dda + ' ' + dda2);
    window.localStorage.setItem('sesdaa', daa + ' ' + daa2);
    window.localStorage.setItem('sesana', ana);
    window.localStorage.setItem('sesfna', fna);
    window.localStorage.setItem('sesfva', fva + '(' + fva2 + ') - ' + fva3 + ' => ' + fva4 + '(' + fva5 + ') - ' + fva6);
    window.localStorage.setItem('sessq', this.jsonflight.search_queries);
    if (Date.parse(moment(localStorage.getItem('sesdad')).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')) > Date.parse(moment(localStorage.getItem('sesdda')).format('YYYY-MM-DD HH:mm:ss'))) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Return Time Should Be Greater Than Depart Time, Minimum 3 Hours After Depart Time',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else {
      this.navCtrl.push(Getflight2Page, {
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

  getBook() {
    this.navCtrl.push(Getflight2Page, {
      jsonflight: this.jsonflight
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Flightresult2Page');
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