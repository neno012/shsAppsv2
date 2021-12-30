import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HotelresultPage } from "../../pages/hotelresult/hotelresult";
import { GethotelPage } from '../../pages/gethotel/gethotel';
/**
 * Generated class for the HoteldetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hoteldetail',
  templateUrl: 'hoteldetail.html',
})
export class HoteldetailPage {
  details: any;
  hotelData: any;
  hoteldetailData: any;
  tabBarElement: any;
  konv: any;
  namahotel: any;
  lat: any;
  long: any;
  hoteljson: any;
  jsonhotel: HotelresultPage;

  constructor(public navCtrl: NavController,
    public http: Http,
    public loading: LoadingController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private iab: InAppBrowser) {
      // console.log(this.jsonhotel);
      
      // this.jsonhotel = JSON.parse(JSON.stringify(navParams.get('jsonhotel')));
    if (localStorage.getItem('seskonv') === undefined || localStorage.getItem('seskonv') === '' || localStorage.getItem('seskonv') === null) {
      this.konv = 6705;
    } else {
      this.konv = localStorage.getItem('seskonv');
    }
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.details = JSON.parse(JSON.stringify(navParams.get('hotelcode')));
    console.log(this.details)
    let shotel = JSON.parse(localStorage.getItem('shotel'))
    console.log(shotel.checkin)
    let data = {
      adult: shotel.adult,
      categorycode: 1,
      checkin: shotel.checkin,
      checkout: shotel.checkout,
      child: shotel.child,
      childage: shotel.childage,
      hotelcode: this.details,
      room: shotel.room
    }
    console.log(data)

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let loader = this.loading.create({
      content: 'Getting Your Hotel…',
    });
    console.log(localStorage.getItem('shotel'))
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/gethotels', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          this.hotelData = JSON.parse(JSON.stringify(res));
          loader.dismiss();
          if (res.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your Hotel Detail Not Available, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
            this.navCtrl.pop();
          } else if (res === null) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your Hotel Detail Not Available, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
            this.navCtrl.pop();
          } else {
            this.hotelData = JSON.parse(JSON.stringify(res));
            this.hotelData = this.hotelData.data.hotels.hotels
            let headers1 = new Headers();
            headers1.append('Accept', 'application/json');
            headers1.append('Content-Type', 'application/json');
            let options1 = new RequestOptions({ headers: headers1 });
            let datadtl = {
              hotelcode: this.details,
              language: "ENG"
            }
            let loader1 = this.loading.create({
              content: 'Getting Your Hotel Detail…',
            });
            loader1.present().then(() => {
              this.http.post('https://sunholidaystyle.com/api/hb/gethoteldetails', datadtl, options1)
                .map(res1 => res1.json())
                .subscribe(res1 => {
                  console.log(res1)
                  this.hoteldetailData = JSON.parse(JSON.stringify(res1));
                  this.namahotel = this.hoteldetailData.hotel.name.content
                  this.lat = this.hoteldetailData.hotel.coordinates.latitude
                  this.long = this.hoteldetailData.hotel.coordinates.longitude
                  console.log(this.hoteldetailData.hotel.address.content)
                  loader1.dismiss()
                },
                  error => {
                    loader1.dismiss();
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
            this.navCtrl.pop();
          });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoteldetailPage');
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

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }

  recheckHotel(hotelcode: any, ratekey: any, ratetype: any, ratecom: any) {
    console.log(hotelcode + ' ' + ratekey + ' ' + ratetype + ' ' + ratecom)
    let data = {
      "hotelcode": hotelcode,
      "ratekey": ratekey,
      "ratetype": ratetype,
      "ratecom": ratecom
    }
    this.navCtrl.push(GethotelPage, {
      jsonhotel: data
    });
  }

  bookHotel(hotelcode: any, hotelname: any, hotelcategory: any, ratekey: any, ratetype: any, rateclass: any, ratecom: any, roomname: any, boardname: any, rooms: any, adults: any, children: any, net: any, checkin: any, checkout: any) {
    console.log(hotelcode + ' ' + hotelname + ' ' + hotelcategory + ' ' + ratekey + ' ' + ratetype + ' ' + rateclass + ' ' + ratecom + ' ' + roomname + ' ' + boardname + ' ' + rooms + ' ' + adults + ' ' + children + ' ' + net + ' ' + checkin + ' ' + checkout)
    let data = {
      "hotelcode": hotelcode,
      "hotelname": hotelname,
      "hotelcategory": hotelcategory,
      "ratekey": ratekey,
      "ratetype": ratetype,
      "rateclass": rateclass,
      "ratecom": ratecom,
      "roomname": roomname,
      "boardname": boardname,
      "rooms": rooms,
      "adults": adults,
      "children": children,
      "net": net,
      "checkin": checkin,
      "checkout": checkout
    }
    this.navCtrl.push(GethotelPage, {
      jsonhotel: data
    });
  }

  getPhone(nomor: any) {
    return nomor.replace(/^0+/, '');
  }

  openMaps(lat: any, long: any, nhotel: any) {
    window.open('geo:' + lat + ',' + long + '?q=' + nhotel, '_system');
    console.log(lat + ' ' + long + ' ' + nhotel)
  }

  openPhone(phone: any) {
    window.open('tel:' + phone, '_system');
  }

  openWeb(web: any) {
    this.iab.create('http://' + web, '_system');
    //window.open('http://' + web, '_system');
    console.log(web)
  }

}
