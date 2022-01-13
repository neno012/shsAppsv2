import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import * as moment from 'moment';

import { PrevflightPage } from '../../pages/prevflight/prevflight';

/**
 * Generated class for the GetflightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getflight2',
  templateUrl: 'getflight2.html',
})
export class Getflight2Page {
  jsonflight: any;
  flightData: any;
  dep: any;
  arr: any;
  datedep: any;
  datearr: any;
  depflightid: any;
  retflightid: any;
  dobadult: any;
  depbag: any;
  arrbag: any;
  retdepbag: any;
  retarrbag: any;
  itemDetails: any;
  departureBaggageadult: any;
  departureBaggageadultdef: any;
  returnBaggageadult: any;
  returnBaggageadultdef: any;
  departureBaggagechild: any;
  departureBaggagechilddef: any;
  returnBaggagechild: any;
  returnBaggagechilddef: any;
  mindobadult: any;
  maxdobadult: any;
  mindobchild: any;
  maxdobchild: any;
  mindobinfant: any;
  maxdobinfant: any;
  adlt: number;
  chld: number;
  nfnt: number;
  konv: any;
  tabBarElement: any;
  dataPoint: any;
  nowPoint: any;
  nowPersen: any;
  adult: any;
  child: any;
  infant: any;
  cartId: any;
  departureBaggage: any;
  returnBaggage: any;
  minexpas: any;
  maxexpas: any;
  minispas: any;
  maxispas: any;
  totalPrice: any;
  contactForm: any;
  prevflightData: any;
  paspor: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appCtrl: App) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.adult = [];
    this.child = [];
    this.infant = [];

    this.paspor = localStorage.getItem('sespaspor');

    if (localStorage.getItem('sesidman') === null || localStorage.getItem('sesidman') === '') {
      let toast = this.toastCtrl.create({
        message: 'Sorry, Please Login First',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      this.navCtrl.pop();
    } else if (localStorage.getItem('sesidman') !== null || localStorage.getItem('sesidman') !== '') {
      let headerspersen = new Headers();
      headerspersen.append('Accept', 'application/json');
      headerspersen.append('Content-Type', 'application/json');
      let optionspersen = new RequestOptions({ headers: headerspersen });
      let datapersen = {
        idman: localStorage.getItem('sesidman')
      };
      let loaderpersen = this.loading.create({
        content: 'Checking Your Point…',
      });
      loaderpersen.present().then(() => {
        this.http.post('https://sunholidaystyle.com/api/getpoint', datapersen, optionspersen)
          .map(respoint => respoint.json())
          .subscribe(respoint => {
            this.dataPoint = JSON.parse(JSON.stringify(respoint));
            let dataPnt = this.dataPoint;
            loaderpersen.dismiss()
            if (dataPnt.status == 1) {
              this.nowPoint = dataPnt.point;
              this.nowPersen = dataPnt.persen;
              console.log(this.nowPoint, this.nowPersen)

              if (this.nowPersen >= 50 || this.nowPersen >= '50') {
                this.konv = localStorage.getItem('seskonv');
                this.jsonflight = JSON.parse(JSON.stringify(navParams.get('jsonflight')));
                let headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Content-Type', 'application/json');
                let options = new RequestOptions({ headers: headers });
                let data = {
                  idm: localStorage.getItem('sesidman'),
                  flightiddep: localStorage.getItem('sesidd'),
                  supplieriddep: localStorage.getItem('sessid'),
                  flightidret: localStorage.getItem('sesida'),
                  supplieridret: localStorage.getItem('sessia'),
                  departureprice: localStorage.getItem('sestfd'),
                  returnprice: localStorage.getItem('sestfa'),
                  currency: localStorage.getItem('sescrd'),
                  searchtype: localStorage.getItem('sersearchtype'),
                  token: localStorage.getItem('sertoken')
                };
                let loader = this.loading.create({
                  content: 'Getting Your Flight, Please Wait…',
                });
                console.log(data);
                loader.present().then(() => {
                  this.http.post('https://sunholidaystyle.com/api/getflightjsonv2', data, options)
                    .map(res => res.json())
                    .subscribe(res => {
                      console.log(res)
                      this.flightData = JSON.parse(JSON.stringify(res));
                      if (this.flightData.result.data.returnPriceDetail === null) {
                        this.totalPrice = parseInt(this.flightData.result.data.departurePriceDetail.totalAdult) + parseInt(this.flightData.result.data.departurePriceDetail.totalChild) + parseInt(this.flightData.result.data.departurePriceDetail.totalInfant);
                      } else {
                        this.totalPrice = parseInt(this.flightData.result.data.departurePriceDetail.totalAdult) + parseInt(this.flightData.result.data.departurePriceDetail.totalChild) + parseInt(this.flightData.result.data.departurePriceDetail.totalInfant) + parseInt(this.flightData.result.data.returnPriceDetail.totalAdult) + parseInt(this.flightData.result.data.returnPriceDetail.totalChild) + parseInt(this.flightData.result.data.returnPriceDetail.totalInfant);
                      }
                      if (Math.round(this.totalPrice / this.konv) > this.nowPoint) {
                        loader.dismiss();
                        let toast = this.toastCtrl.create({
                          message: 'Sorry, Your Point Is Not Enough, Please Top Up Your Point',
                          duration: 3000,
                          position: 'middle',
                          cssClass: 'toastWarning'
                        });
                        toast.present();
                        this.navCtrl.pop();
                      } else {
                        if (this.flightData.status === 1) {
                          for (let details of this.flightData.result.data.details) {
                            for (let itemDetails of details.itemDetails) {
                              this.itemDetails = itemDetails;
                              if (itemDetails.journeyType === 'DEPARTURE') {
                                this.dep = itemDetails.departure.cityName;
                                this.arr = itemDetails.arrival.cityName;
                                this.datedep = itemDetails.departure.date;
                                this.depflightid = itemDetails.flightId;
                                this.depbag = itemDetails.departure.airportCode;
                                this.arrbag = itemDetails.arrival.airportCode;
                              }
                              if (itemDetails.journeyType === 'RETURN') {
                                //console.log('ini return')
                                this.datearr = itemDetails.departure.date;
                                this.retflightid = itemDetails.flightId;
                                this.retdepbag = itemDetails.departure.airportCode;
                                this.retarrbag = itemDetails.arrival.airportCode;
                              }
                            }
                          }
                          this.adlt = this.flightData.result.data.passengerForm.countAdult;
                          this.chld = this.flightData.result.data.passengerForm.countChild;
                          this.nfnt = this.flightData.result.data.passengerForm.countInfant;
                          this.contactForm = this.flightData.result.data.contactSegment.contactForm;
                          if (this.flightData.result.data.details[0].itemDetails[0].international === true) {
                            //if (this.flightData.result.data.details[0].itemDetails[0].departure.countryCode !== 'ID' || this.flightData.result.data.details[0].itemDetails[0].arrival.countryCode !== 'ID') {
                            this.paspor = 'ya';
                            for (let adultForm of this.flightData.result.data.passengerForm.adultForm) {
                              if (adultForm.name === 'issuingDate') {
                                for (let validators of adultForm.validators) {
                                  if (validators.name === 'minDate') {
                                    this.minispas = validators.parameter;
                                  }
                                  if (validators.name === 'maxDate') {
                                    this.maxispas = validators.parameter;
                                  }
                                }
                              }
                              if (adultForm.name === 'passportExpiry') {
                                for (let validators of adultForm.validators) {
                                  if (validators.name === 'minDate') {
                                    this.minexpas = validators.parameter;
                                  }
                                  if (validators.name === 'maxDate') {
                                    this.maxexpas = validators.parameter;
                                  }
                                }
                              }
                            }
                          } else if (this.flightData.result.data.details[0].itemDetails[0].international === false) {
                            this.paspor = 'tidak';
                          }
                          for (let infantForm of this.flightData.result.data.passengerForm.infantForm) {
                            if (infantForm.name === 'dob') {
                              for (let validators of infantForm.validators) {
                                if (validators.name === 'minDate') {
                                  this.mindobinfant = validators.parameter;
                                }
                                if (validators.name === 'maxDate') {
                                  this.maxdobinfant = validators.parameter;
                                }
                              }
                            }
                          }
                          for (let childForm of this.flightData.result.data.passengerForm.childForm) {
                            if (childForm.name === 'dob') {
                              for (let validators of childForm.validators) {
                                if (validators.name === 'minDate') {
                                  this.mindobchild = validators.parameter;
                                }
                                if (validators.name === 'maxDate') {
                                  this.maxdobchild = validators.parameter;
                                }
                              }
                            }
                          }
                          for (let adultForm of this.flightData.result.data.passengerForm.adultForm) {
                            if (adultForm.name === 'dob') {
                              for (let validators of adultForm.validators) {
                                if (validators.name === 'minDate') {
                                  this.mindobadult = validators.parameter;
                                }
                                if (validators.name === 'maxDate') {
                                  this.maxdobadult = validators.parameter;
                                }
                              }
                              this.dobadult = 'required';
                            }
                          }
                          //console.log(this.mindobinfant + ' ' + this.maxdobinfant + ' ' + this.mindobchild + ' ' + this.maxdobchild + ' ' + this.mindobadult + ' ' + this.maxdobadult + ' ' + this.dobadult)
                          this.cartId = this.flightData.cartid;
                          this.departureBaggageadult = []
                          this.departureBaggageadultdef = []
                          this.returnBaggageadult = []
                          this.returnBaggageadultdef = []
                          this.departureBaggagechild = []
                          this.departureBaggagechilddef = []
                          this.returnBaggagechild = []
                          this.returnBaggagechilddef = []

                          if (!this.flightData.result.data.optionData.departureBaggage || this.flightData.result.data.optionData.departureBaggage.length === 1) {
                            this.departureBaggage = undefined;
                          } else {
                            this.departureBaggage = this.flightData.result.data.optionData.departureBaggage;
                          }
                          if (!this.flightData.result.data.optionData.returnBaggage || this.flightData.result.data.optionData.returnBaggage.length === 1) {
                            this.returnBaggage = undefined;
                          } else {
                            this.returnBaggage = this.flightData.result.data.optionData.returnBaggage;
                          }
                          //console.log(this.departureBaggage + ' ' + this.returnBaggage)
                          this.contactSegment = {
                            "title": "Mr",
                            "fullName": "",
                            "areaCode": "+62",
                            // "phone": "88804801175",
                            "phone": "",
                            "email": "itdiv.shs@gmail.com"
                          };

                          if (this.paspor === 'ya') {
                            if (this.datearr === undefined) {
                              for (let i = 1; i <= this.adlt; i++) {
                                this.adult.push({
                                  "firstName": "",
                                  "lastName": "",
                                  "title": "Mr",
                                  "nationality": "ID",
                                  "dob": "",
                                  "passportNo": "",
                                  "issuingDate": "",
                                  "passportExpiry": "",
                                  "issuingCountry": "ID",
                                  "departureBaggage": 0
                                });
                              }
                              for (let i = 1; i <= this.chld; i++) {
                                this.child.push({
                                  "firstName": "",
                                  "lastName": "",
                                  "title": "Mstr",
                                  "nationality": "ID",
                                  "dob": "",
                                  "passportNo": "",
                                  "issuingDate": "",
                                  "passportExpiry": "",
                                  "issuingCountry": "ID",
                                  "departureBaggage": 0
                                });
                              }
                              for (let i = 1; i <= this.nfnt; i++) {
                                this.infant.push({
                                  "firstName": "",
                                  "lastName": "",
                                  "title": "Mstr",
                                  "nationality": "ID",
                                  "dob": "",
                                  "passportNo": "",
                                  "issuingDate": "",
                                  "passportExpiry": "",
                                  "issuingCountry": "ID"
                                });
                              }
                            } else {
                              for (let i = 1; i <= this.adlt; i++) {
                                this.adult.push({
                                  "firstName": "",
                                  "lastName": "",
                                  "title": "Mr",
                                  "nationality": "ID",
                                  "dob": "",
                                  "passportNo": "",
                                  "issuingDate": "",
                                  "passportExpiry": "",
                                  "issuingCountry": "ID",
                                  "departureBaggage": 0,
                                  "returnBaggage": 0
                                });
                              }
                              for (let i = 1; i <= this.chld; i++) {
                                this.child.push({
                                  "firstName": "",
                                  "lastName": "",
                                  "title": "Mstr",
                                  "nationality": "ID",
                                  "dob": "",
                                  "passportNo": "",
                                  "issuingDate": "",
                                  "passportExpiry": "",
                                  "issuingCountry": "ID",
                                  "departureBaggage": 0,
                                  "returnBaggage": 0
                                });
                              }
                              for (let i = 1; i <= this.nfnt; i++) {
                                this.infant.push({
                                  "firstName": "",
                                  "lastName": "",
                                  "title": "Mstr",
                                  "nationality": "ID",
                                  "dob": "",
                                  "passportNo": "",
                                  "issuingDate": "",
                                  "passportExpiry": "",
                                  "issuingCountry": "ID"
                                });
                              }
                            }
                          } else if (this.paspor === 'tidak') {
                            if (this.datearr === undefined) {
                              if (this.dobadult === 'required') {
                                for (let i = 1; i <= this.adlt; i++) {
                                  this.adult.push({
                                    "fullName": "",
                                    "title": "Mr",
                                    "dob": "",
                                    "nationality": "ID",
                                    "departureBaggage": 0
                                  });
                                }
                              } else if (this.dobadult === undefined) {
                                for (let i = 1; i <= this.adlt; i++) {
                                  this.adult.push({
                                    "fullName": "",
                                    "title": "Mr",
                                    "nationality": "ID",
                                    "departureBaggage": 0
                                  });
                                }
                              }
                              for (let i = 1; i <= this.chld; i++) {
                                this.child.push({
                                  "fullName": "",
                                  "title": "Mstr",
                                  "dob": "",
                                  "nationality": "ID",
                                  "departureBaggage": 0
                                });
                              }
                              for (let i = 1; i <= this.nfnt; i++) {
                                this.infant.push({
                                  "fullName": "",
                                  "title": "Mstr",
                                  "dob": "",
                                  "nationality": "ID"
                                });
                              }
                            } else {
                              if (this.dobadult === 'required') {
                                for (let i = 1; i <= this.adlt; i++) {
                                  this.adult.push({
                                    "fullName": "",
                                    "title": "Mr",
                                    "dob": "",
                                    "nationality": "ID",
                                    "departureBaggage": 0,
                                    "returnBaggage": 0
                                  });
                                }
                              } else if (this.dobadult === undefined) {
                                for (let i = 1; i <= this.adlt; i++) {
                                  this.adult.push({
                                    "fullName": "",
                                    "title": "Mr",
                                    "nationality": "ID",
                                    "departureBaggage": 0,
                                    "returnBaggage": 0
                                  });
                                }
                              }
                              for (let i = 1; i <= this.chld; i++) {
                                this.child.push({
                                  "fullName": "",
                                  "title": "Mstr",
                                  "dob": "",
                                  "nationality": "ID",
                                  "departureBaggage": 0,
                                  "returnBaggage": 0
                                });
                              }
                              for (let i = 1; i <= this.nfnt; i++) {
                                this.infant.push({
                                  "fullName": "",
                                  "title": "Mstr",
                                  "dob": "",
                                  "nationality": "ID"
                                });
                              }
                            }
                          }
                          loader.dismiss();
                          console.log(this.paspor)
                        } else if (this.flightData.status === 0) {
                          loader.dismiss();
                          let toast = this.toastCtrl.create({
                            message: 'Sorry, Internal Server Error, Please Try Again',
                            duration: 3000,
                            position: 'middle',
                            cssClass: 'toastWarning'
                          })
                          toast.present();
                          this.navCtrl.pop();
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
                        this.navCtrl.pop();
                      });
                });
              } else {
                let toast = this.toastCtrl.create({
                  message: 'Sorry, Your Payment Under 50%, Please Make A Payment Above 50%',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'toastWarning'
                });
                toast.present();
                this.navCtrl.pop();
              }
            } else {
              let toast = this.toastCtrl.create({
                message: 'Sorry, Data not Loaded',
                duration: 3000,
                position: 'middle',
                cssClass: 'toastWarning'
              });
              toast.present();
              this.navCtrl.pop();
            }
          },
            error => {
              loaderpersen.dismiss();
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

  contactSegment = {}
  allData = []
  getlogForm() {
    this.allData.push({ "contact": this.contactSegment, "adults": this.adult, "childs": this.child, "infants": this.infant, "cartId": this.cartId, "insurance": false })
    console.log(this.allData[0])
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman'),
      token: localStorage.getItem('sertoken'),
      dataBook: this.allData[0]
    }
    console.log(data)
    let loader = this.loading.create({
      content: 'Request to Airline…',
    });
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/bookflightjsonv2', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          this.prevflightData = JSON.parse(JSON.stringify(res));
          loader.dismiss();
          if (this.prevflightData.status === 1) {
            this.navCtrl.push(PrevflightPage, {
              prevflightData: this.prevflightData
            });
          } else {
            //loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Sorry, ' + this.prevflightData.result.message,
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Getflight2Page');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
