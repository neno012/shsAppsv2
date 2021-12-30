import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import * as moment from 'moment';

import { TrainresultPage } from '../../pages/trainresult/trainresult';


/**
 * Generated class for the TrainsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trainsearch',
  templateUrl: 'trainsearch.html',
})
export class TrainsearchPage {
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

    this.dephidden = 'Gambir - Jakarta (GMR) - STATION';
    this.dep = 'GMR';
    this.deptype = 'STATION';
    this.arrhidden = 'Bandung - Bandung (BD) - STATION';
    this.arr = 'BD';
    this.arrtype = 'STATION';

    if (localStorage.getItem('sesidman') === null) {
      //GET IP
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
    // this.cabinclass = 'ECONOMY';
    this.datedep = moment().format('DD MMMM YYYY');
    this.datearr = '';
    this.minDatedep = moment(this.datedep).format();
    this.maxDatedep = moment(this.datedep).add(365, 'days').format();
    let loader2 = this.loading.create({
      content: 'Loading data…',
    });
    localStorage.removeItem('sestkn');
    this.http.get('https://sunholidaystyle.com/api/train/tlink')
      .map(res => res.json())
      .subscribe(res => {
        console.log(res)
        this.tkn = JSON.parse(JSON.stringify(res));
        loader2.dismiss()
        if (this.tkn.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Data not loaded, Please Try Again',
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
            message: 'Sorry, Internal Server Error, Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
          this.navCtrl.pop();
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainsearchPage');
  }

  OpenStationDepart() {
    let modal = this.modalCtrl.create('ShowstationPage', { titleText: "Departure City / Station" })
    modal.onDidDismiss((data) => {
      this.dephidden = data.airname;
      this.dep = data.aircode;
      this.deptype = data.airtype;
      //console.log(data.airport_name, data.airport_code, data.type)
    })
    modal.present().then(() => {
    })
  }

  OpenStationArrival() {
    let modal = this.modalCtrl.create('ShowstationPage', { titleText: "Arrival City / Station" })
    modal.onDidDismiss((data) => {
      this.arrhidden = data.airname;
      this.arr = data.aircode;
      this.arrtype = data.airtype;
      //console.log(data.airport_name, data.airport_code, data.type)
    })
    modal.present().then(() => {
    })
  }

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

  Search() {
    if (this.dep === this.arr) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Departure city and destination city must be different',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.dep === '' || this.dep === null) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Please select airport departure and destination',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else if (this.arr === '' || this.arr === null) {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Please select airport departure and destination',
        duration: 3000,
        position: 'middle',
        cssClass: 'toastWarning'
      });
      toast.present();
    } else {
      if (this.adult < this.infant) {
        let toast = this.toastCtrl.create({
          message: 'Sorry, Number of infants no more than number of adults',
          duration: 3000,
          position: 'middle',
          cssClass: 'toastWarning'
        });
        toast.present();
      } else if ((parseInt(this.adult) + parseInt(this.child)) > 7) {
        let toast = this.toastCtrl.create({
          message: 'Sorry, Total adults and childs more than of 7 passangers',
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
          content: 'Searching Your Flight…',
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
          this.http.post('https://sunholidaystyle.com/api/train/trainresults', data, options)
            .map(res => res.json())
            .subscribe(res => {
              console.log(res)
              this.flightData = JSON.parse(JSON.stringify(res));
              if (res.status === 0) {
                let toast = this.toastCtrl.create({
                  message: 'Sorry, Your Train Not Available, Please Try Again',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'toastError'
                });
                toast.present();
                loader.dismiss();
              } else if (res === null) {
                let toast = this.toastCtrl.create({
                  message: 'Sorry, Your Train Not Available, Please Try Again',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'toastError'
                });
                toast.present();
                loader.dismiss();
              } else {
                this.flightData = JSON.parse(JSON.stringify(res));
                loader.dismiss()
                if (this.flightData.departures.length === 0) {
                  let toast = this.toastCtrl.create({
                    message: 'Sorry, Your Train Not Available, Please Try Again',
                    duration: 3000,
                    position: 'middle',
                    cssClass: 'toastWarning'
                  });
                  toast.present();
                } else {
                  this.navCtrl.push(TrainresultPage, {
                    jsonflight: res
                  });
                }
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
  }

}
