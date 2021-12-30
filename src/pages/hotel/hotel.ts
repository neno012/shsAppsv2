import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import * as moment from 'moment';

import { HotelresultPage } from '../../pages/hotelresult/hotelresult';
/**
 * Generated class for the HotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html',
})
export class HotelPage {

  public hotelcode: string = '';
  public hotelname: string = '';
  public hotelcategory: string = '';
  public room: string = '';
  public adult: string = '';
  public child: string = '';
  public datein: any;
  public dateout: any;
  public datac: any;

  hotelData: any;
  minDatein: any;
  maxDatein: any;
  minDateout: any;
  maxDateout: any;
  tabBarElement: any;
  childage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.hotelname = 'Surabaya Area (SUB) - Indonesia';
    this.hotelcode = 'SUB';
    this.hotelcategory = '3';
    this.room = '1';
    this.adult = '2';
    this.child = '0';

    this.datein = moment().format('DD MMMM YYYY');
    this.dateout = moment().add(1, 'days').format('DD MMMM YYYY');
    this.minDatein = moment(this.datein).format();
    this.maxDatein = moment(this.datein).add(365, 'days').format();
    this.minDateout = moment(this.datein).add(1, 'days').format();
    this.maxDateout = moment(this.datein).add(15, 'days').format();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  OpenHotel() {
    let modal = this.modalCtrl.create('ShowhotelPage', { titleText: "Hotel Name / Location" })
    modal.onDidDismiss((data) => {
      this.hotelname = data.hotname;
      this.hotelcode = data.hotcode;
      this.hotelcategory = data.hotcategory;
      console.log(data)
    })
    modal.present().then(() => {
    })
  }

  inCal() {
    const options: CalendarModalOptions = {
      defaultDateRange: { from: this.minDatein, to: this.maxDatein },
      defaultScrollTo: moment().add(1, 'day').toDate(),
      title: 'Check In Date',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      color: 'danger',
      weekStart: 1,
      from: this.minDatein,
      to: this.maxDatein
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: CalendarResult, type: any) => {
      if (date) {
        this.datein = moment(date.string).format('DD MMMM YYYY');
        this.dateout = moment(date.string).add(1, 'days').format('DD MMMM YYYY');
        this.minDateout = moment(this.datein).add(1, 'days').format();
        this.maxDateout = moment(this.datein).add(15, 'days').format();
      }
    })
  }

  outCal() {
    const options: CalendarModalOptions = {
      defaultDateRange: { from: this.minDatein, to: this.maxDateout },
      defaultScrollTo: moment().add(1, 'days').toDate(),
      title: 'Check Out Date',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      color: 'danger',
      weekStart: 1,
      from: this.minDateout,
      to: this.maxDateout
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: CalendarResult, type: any) => {
      if (date) {
        this.dateout = moment(date.string).format('DD MMMM YYYY');
      }
    })
  }

  checkChild() {
    if (this.child === '0') {
      this.datac = [];
      console.log(this.datac)
    } else if (this.child === '1') {
      this.datac = [{ "age": "1" }];
      console.log(this.datac)
    } else if (this.child === '2') {
      this.datac = [{ "age": "1" }, { "age": "1" }];
      console.log(this.datac)
    } else if (this.child === '3') {
      this.datac = [{ "age": "1" }, { "age": "1" }, { "age": "1" }];
      console.log(this.datac)
    } else if (this.child === '4') {
      this.datac = [{ "age": "1" }, { "age": "1" }, { "age": "1" }, { "age": "1" }];
      console.log(this.datac)
    } else {
      this.datac = [];
      console.log(this.datac)
    }
  }

  allData = []
  ddtt = []
  hotelSearch() {
    console.log(this.datac)
    for(let dtc of this.datac){
      this.ddtt.push(dtc.age)
    }
    console.log(this.ddtt)
    this.allData.push({ "hotelcode": this.hotelcode, "categorycode": this.hotelcategory, "checkin": moment(this.datein).format('YYYY-MM-DD'), "checkout": moment(this.dateout).format('YYYY-MM-DD'), "room": this.room, "adult": this.adult, "child": this.child, "childage": this.ddtt });
    console.log(this.allData[0])
    localStorage.setItem('shotel', JSON.stringify(this.allData[0]))
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let loader = this.loading.create({
      content: 'Searching Your Hotel…',
    });
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/gethotels', this.allData[0], options)
        .map(res => res.json())
        .subscribe(res => {
          this.allData = []          
          this.ddtt = []
          console.log(res)
          this.hotelData = JSON.parse(JSON.stringify(res));
          if (res.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your Hotel Not Available, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
            loader.dismiss();
          } else if (res === null) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your Hotel Not Available, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
            loader.dismiss();
          } else {
            this.hotelData = JSON.parse(JSON.stringify(res));
            loader.dismiss()
            this.navCtrl.push(HotelresultPage, {
              jsonhotel: res
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
          });
    });
  }

}
