import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { GethotelPage } from '../../pages/gethotel/gethotel';
import { HoteldetailPage } from '../../pages/hoteldetail/hoteldetail';
// import { from } from 'rxjs/observable/from'; 
/**
 * Generated class for the HotelresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotelresult',
  templateUrl: 'hotelresult.html',
})
export class HotelresultPage {
  jsonhotel       : any;
  tabBarElement   : any;
  hotelData       : any;
  konv            : any;
  address         : any;
  data            : any;

  constructor(
    public navCtrl    : NavController,
    public navParams  : NavParams,
    public alertCtrl  : AlertController,
    public http       : Http,
    public loading    : LoadingController,
    public toastCtrl  : ToastController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.jsonhotel = JSON.parse(JSON.stringify(navParams.get('jsonhotel')));
    if (localStorage.getItem('seskonv') === undefined || localStorage.getItem('seskonv') === '' 
        || localStorage.getItem('seskonv') === null) {
      this.konv = 6705;
    } else {
      this.konv = localStorage.getItem('seskonv');
    }
  }

  reSearch(event) {

    //// check to confirm the username and password fields are filled
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log(localStorage.getItem('shotel'))
    this.http.post('https://sunholidaystyle.com/api/hb/gethotels', localStorage.getItem('shotel'), options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res)
        this.hotelData = JSON.parse(JSON.stringify(res));
        if (res.status === 0) {
          let toast = this.toastCtrl.create({
            message   : 'Sorry, Your Hotel Not Available, Please Try Again',
            duration  : 3000,
            position  : 'middle',
            cssClass  : 'toastError'
          });
          toast.present();
          event.complete();
        } else if (res === null) {
          let toast = this.toastCtrl.create({
            message   : 'Sorry, Your Hotel Not Available, Please Try Again',
            duration  : 3000,
            position  : 'middle',
            cssClass  : 'toastError'
          });
          toast.present();
          event.complete();
        } else {
          this.jsonhotel = JSON.parse(JSON.stringify(res));
          event.complete();
        }
      },
        error => {
          event.complete();
          console.log(error);
          let toast = this.toastCtrl.create({
            message   : 'Sorry, Internal Server Error, Please Try Again',
            duration  : 3000,
            position  : 'middle',
            cssClass  : 'toastError'
          });
          toast.present();
        });
  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelresultPage');
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

  recheckHotel(
    hotelcode: any, 
    ratekey: any, 
    ratetype: any, 
    ratecom: any,
    rateClass: any) {
    console.log(hotelcode + ' ' + ratekey + ' ' + ratetype + ' ' + ratecom + ' ' + rateClass)
    let data = {
      "hotelcode" : hotelcode,
      "ratekey"   : ratekey,
      "ratetype"  : ratetype,
      "ratecom"   : ratecom,
      "rateClass" : rateClass
    }
    this.navCtrl.push(GethotelPage, {
      jsonhotel: data,
    });
  }

  bookHotel(
    hotelcode     : any, 
    hotelname     : any, 
    hotelcategory : any, 
    ratekey       : any, 
    ratetype      : any, 
    rateclass     : any, 
    ratecom       : any, 
    roomname      : any, 
    boardname     : any, 
    rooms         : any, 
    adults        : any, 
    children      : any, 
    net           : any, 
    // checkin      : any, 
    // checkout     : any,
    cancelamount  : any,
    cancelfrom    : any) {
    console.log(hotelcode + ' ' + hotelname + ' ' + hotelcategory + ' ' + ratekey + ' ' + ratetype + ' ' + rateclass 
                + ' ' + ratecom + ' ' + roomname + ' ' + boardname + ' ' + rooms + ' ' + adults + ' ' + children + ' ' 
                + net + ' ' + this.jsonhotel.request.stay.checkIn + ' ' + this.jsonhotel.request.stay.checkOut + ' ' 
                + cancelamount +' '+ cancelfrom)
    let data = {
      "hotelcode"     : hotelcode,
      "hotelname"     : hotelname,
      "hotelcategory" : hotelcategory,
      "ratekey"       : ratekey,
      "ratetype"      : ratetype,
      "rateclass"     : rateclass,
      "ratecom"       : ratecom,
      "roomname"      : roomname,
      "boardname"     : boardname,
      "rooms"         : rooms,
      "adults"        : adults,
      "children"      : children,
      "net"           : net,
      "checkin"       : this.jsonhotel.request.stay.checkIn,
      "checkout"      : this.jsonhotel.request.stay.checkOut,
      "cancelamount"  : cancelamount,
      "cancelfrom"    : cancelfrom
    }
    this.navCtrl.push(GethotelPage, {
      jsonhotel: data
    });
  }

  detailsHotel(code: any) {
    console.log(code);
    
    this.navCtrl.push(HoteldetailPage, {
      hotelcode: code
    });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  convDate(dt: any) {
    let tgl = moment(dt).format('DD MMMM YYYY');
    return tgl;
  }

}
