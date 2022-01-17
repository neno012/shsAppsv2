import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import * as moment from 'moment';

import { FlightresultPage } from '../../pages/flightresult/flightresult';

/**
 * Generated class for the FlightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight',
  templateUrl: 'flight.html',
})
export class FlightPage {
  public dep: string = '';
  public arr: string = '';
  public deptype: string = '';
  public arrtype: string = '';
  public dephidden: string = '';
  public arrhidden: string = '';
  public datedep: any;
  public datearr: any;
  public adult: any;
  public child: any;
  public infant: any;
  public cabinclass: any;

  flightData: any;
  listairport: any;
  listairport1: any;
  visability: boolean = false;
  shodet: any;
  minDatedep: any;
  maxDatedep: any;
  minDatearr: any;
  maxDatearr: any;
  tkn: any;
  tabBarElement: any;
  searchType: any;
  idman: any;
  tgl: any;
  YourValue: any;
  items: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    localStorage.removeItem('sesidd');
    localStorage.removeItem('sesddd');
    localStorage.removeItem('sesdad');
    localStorage.removeItem('sesand');
    localStorage.removeItem('sesfnd');
    localStorage.removeItem('sesfvd');
    localStorage.removeItem('sesida');
    localStorage.removeItem('sesdda');
    localStorage.removeItem('sesdaa');
    localStorage.removeItem('sesana');
    localStorage.removeItem('sesfna');
    localStorage.removeItem('sesfva');
    localStorage.removeItem('sessq');

    this.dephidden = 'All airports in Jakarta (JKTC) - Jakarta';
    this.dep = 'JKTC';
    this.deptype = 'CITY';
    this.arrhidden = 'All airports in Denpasar-Bali (DPSC) - Denpasar-Bali';
    this.arr = 'DPSC';
    this.arrtype = 'CITY';

    if (localStorage.getItem('sesidman') === null) {
      this.http.get('http://www.ip-api.com/json')
        .map(aipi => aipi.json())
        .subscribe(aipi => {
          console.log(aipi);
          let ipdata = aipi;
          this.idman = ipdata.query;
        },
          error => {
            console.log(error);
            this.idman = 'Android 9+';
          })
    } else {
      this.idman = localStorage.getItem('sesidman');
    }

    this.adult = '1';
    this.child = '0';
    this.infant = '0';
    this.cabinclass = 'ECONOMY';
    this.datedep = moment().format('DD MMMM YYYY');
    this.datearr = '';
    this.minDatedep = moment(this.datedep).format();
    this.maxDatedep = moment(this.datedep).add(365, 'days').format();
    let loader2 = this.loading.create({
      content: 'Mencari Penerbangan…',
    });
    localStorage.removeItem('sestkn');
    this.http.get('https://sunholidaystyle.com/api/gettokenv2')
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res)
        this.tkn = JSON.parse(JSON.stringify(res));
        loader2.dismiss()
        if (this.tkn.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Maaf, Data tidak tersedia, Mohon Coba lagi',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
          this.navCtrl.pop();
        } else {
          window.localStorage.setItem('sestkn', this.tkn.token);
        }
      },
        error => {
          loader2.dismiss();
          console.log(error);
          let toast = this.toastCtrl.create({
            message: 'Maaf, Internal Server Error, Mohon Coba Lagi',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
          this.navCtrl.pop();
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightPage');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  OpenAirportDepart() {
    let modal = this.modalCtrl.create('ShowairportPage', { titleText: "Departure City / Airport" })
    modal.onDidDismiss((data) => {
      this.dephidden = data.airname;
      this.dep = data.aircode;
      this.deptype = data.airtype;
      //console.log(data.airport_name, data.airport_code, data.type)
    })
    modal.present().then(() => {
    })
  }

  OpenAirportArrival() {
    let modal = this.modalCtrl.create('ShowairportPage', { titleText: "Arrival City / Airport" })
    modal.onDidDismiss((data) => {
      this.arrhidden = data.airname;
      this.arr = data.aircode;
      this.arrtype = data.airtype;
      //console.log(data.airport_name, data.airport_code, data.type)
    })
    modal.present().then(() => {
    })
  }

  // OpenSelect() {
  //   let modal = this.modalCtrl.create('SelectairportPage', { /*data: this.listairport,*/ titleText: "Departure City / Airport" })
  //   modal.onDidDismiss((data) => {
  //     this.dephidden = data.airport_name + ' (' + data.airport_code + ') - ' + data.location_name;
  //     this.dep = data.airport_code;
  //     this.deptype = data.type;
  //     //console.log(data.airport_name, data.airport_code, data.type)
  //   })
  //   modal.present().then(() => {
  //   })
  // }

  // OpenSelect2() {
  //   let modal = this.modalCtrl.create('SelectairportPage', { /*data: this.listairport,*/ titleText: "Arrival City / Airport" })
  //   modal.onDidDismiss((data) => {
  //     this.arrhidden = data.airport_name + ' (' + data.airport_code + ') - ' + data.location_name;
  //     this.arr = data.airport_code;
  //     this.arrtype = data.type;
  //     console.log(data.airport_name, data.airport_code, data.type)
  //   })
  //   modal.present().then(() => {
  //   })
  // }

  depCal() {
    const options: CalendarModalOptions = {
      defaultDateRange: { from: this.minDatedep, to: this.maxDatedep },
      defaultScrollTo: moment().add(1, 'day').toDate(),
      title: 'Departure Date',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      color: 'danger',
      weekStart: 1,
      from: this.minDatedep,
      to: this.maxDatedep
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: CalendarResult, type: any) => {
      if (date) {
        this.datedep = moment(date.string).format('DD MMMM YYYY');
        this.datearr = moment(date.string).add(1, 'days').format('DD MMMM YYYY');
        this.minDatearr = moment(this.datedep).format();
        this.maxDatearr = moment(this.datedep).add(365, 'days').format();
      }
    })
  }

  retCal() {
    const options: CalendarModalOptions = {
      defaultDateRange: { from: this.minDatedep, to: this.maxDatearr },
      defaultScrollTo: moment().add(1, 'day').toDate(),
      title: 'Return Date',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      color: 'danger',
      weekStart: 1,
      from: this.minDatearr,
      to: this.maxDatedep
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: CalendarResult, type: any) => {
      if (date) {
        this.datearr = moment(date.string).format('DD MMMM YYYY');
      }
    })
  }

  showTgl(items) {
    //console.log('onChange', items);
    let isChecked = false;
    if (this.shodet == true) {
      isChecked = true;
      this.visability = true;

      //datearr
      this.datearr = moment(this.datedep).add(1, 'days').format('DD MMMM YYYY');
      this.minDatearr = moment(this.datedep).format();
      this.maxDatearr = moment(this.datedep).add(365, 'days').format();
    }
    if (isChecked == false) {
      this.visability = false;
      this.datearr = '';
    }
  }

  dateDep() {
    //datearr
    this.datearr = moment(this.datedep).add(1, 'days').format('DD MMMM YYYY');
    this.minDatearr = moment(this.datedep).format();
    this.maxDatearr = moment(this.datedep).add(365, 'days').format();
  }

  cekInfant() {
    if (this.adult < this.infant) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Number of infants no more than number of adults',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
      this.infant = this.adult;
    }
  }

  changerInput() {
    let inA = this.dep;
    let inB = this.arr;
    let inC = this.dephidden;
    let inD = this.arrhidden;
    let inE = this.deptype;
    let inF = this.arrtype;
    this.dep = inB;
    this.arr = inA;
    this.dephidden = inD;
    this.arrhidden = inC;
    this.deptype = inF;
    this.arrtype = inE;
  }

  flightSearch() {
    if (this.dep === this.arr) {
      let toast = this.toastCtrl.create({
        message: 'Maaf, Kota Asal dan Kota Tujuan Harus Berbeda',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.dep === '' || this.dep === null) {
      let toast = this.toastCtrl.create({
        message: 'Maaf, Mohon Masukkan Bandara Asal dan Tujuan',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.arr === '' || this.arr === null) {
      let toast = this.toastCtrl.create({
        message: 'Maaf, Mohon Masukkan Bandara Asal dan Tujuan',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else {
      if (this.adult < this.infant) {
        let toast = this.toastCtrl.create({
          message: 'Maaf, Jumlah Penumpang Bayi Tidak Boleh Lebih Dari Jumlah Penumpang Dewasa',
          duration: 3000,
          position: 'middle',
          cssClass: 'toastWarning'
        });
        toast.present();
      } else if ((parseInt(this.adult) + parseInt(this.child)) > 7) {
        let toast = this.toastCtrl.create({
          message: 'Maaf, Jumlah orang dewasa dan anak-anak lebih dari 7 penumpang',
          duration: 3000,
          position: 'middle',
          cssClass: 'toastWarning'
        });
        toast.present();
      } else {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        if (this.visability === false) {
          this.datearr = '';
          this.searchType = 'ONE_WAY';
        } else {
          this.searchType = 'ROUND_TRIP';
        }
        let data = {
          idman: this.idman,
          dep: this.dep,
          arr: this.arr,
          deptype: this.deptype,
          arrtype: this.arrtype,
          datedep: moment(this.datedep).format('YYYY-MM-DD'),
          datearr: moment(this.datearr).format('YYYY-MM-DD'),
          adult: this.adult,
          child: this.child,
          infant: this.infant,
          cabinclass: this.cabinclass,
          searchtype: this.searchType,
          token: localStorage.getItem('sestkn')
        };
        let loader = this.loading.create({
          content: 'Mencari Penerbangan…',
        });
        console.log(data)
        //console.log(this.datedep)
        window.localStorage.setItem('seridman', this.idman)
        window.localStorage.setItem('serdep', this.dep)
        window.localStorage.setItem('serarr', this.arr)
        window.localStorage.setItem('serdeptype', this.deptype)
        window.localStorage.setItem('serarrtype', this.arrtype)
        window.localStorage.setItem('serdatedep', this.datedep)
        window.localStorage.setItem('serdatearr', this.datearr)
        window.localStorage.setItem('seradult', this.adult)
        window.localStorage.setItem('serchild', this.child)
        window.localStorage.setItem('serinfant', this.infant)
        window.localStorage.setItem('sercabinclass', this.cabinclass)
        window.localStorage.setItem('sersearchtype', this.searchType)
        window.localStorage.setItem('sertoken', localStorage.getItem('sestkn'))
        loader.present().then(() => {
          this.http.post('https://sunholidaystyle.com/api/searchflightjsonv2', data, options)
            .map(res => res.json())
            .subscribe(res => {
              console.log(res)
              this.flightData = JSON.parse(JSON.stringify(res));
              if (res.status === 0) {
                let toast = this.toastCtrl.create({
                  message: 'Maaf, Penerbangan Anda Tidak Tersedia, Silakan Coba Lagi',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'toastError'
                });
                toast.present();
                loader.dismiss();
              } else if (res === null) {
                let toast = this.toastCtrl.create({
                  message: 'Maaf, Penerbangan Anda Tidak Tersedia, Silakan Coba Lagi',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'toastError'
                });
                toast.present();
                loader.dismiss();
              } else {
                this.flightData = JSON.parse(JSON.stringify(res));
                loader.dismiss()
                if (this.flightData.data.searchList.departureFlights.length === 0) {
                  let toast = this.toastCtrl.create({
                    message: 'Maaf, Penerbangan Anda Tidak Tersedia, Silakan Coba Lagi',
                    duration: 3000,
                    position: 'middle',
                    cssClass: 'toastWarning'
                  });
                  toast.present();
                } else {
                  this.navCtrl.push(FlightresultPage, {
                    jsonflight: res
                  });
                }
              }
            },
              error => {
                loader.dismiss();
                console.log(error);
                let toast = this.toastCtrl.create({
                  message: 'Maaf, Internal Server Error, Silakan Coba Lagi',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'toastError'
                });
                toast.present();
              });
        });
      }
    }
  }

}