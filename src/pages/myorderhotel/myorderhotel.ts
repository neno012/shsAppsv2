import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform ,AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as momenttimezone from 'moment-timezone';

/**
 * Generated class for the MyorderhotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorderhotel',
  templateUrl: 'myorderhotel.html',
})
export class MyorderhotelPage {
  tabBarElement: any;
  listorder: any;
  konv: any;
  idm: any;
  status: any;
  dataorder: any;
  todayDate: any;
  dataPoint: any;
  nowPoint: any;
  nowPersen: any;
  dataIssued: any;
  dataCancelbook: any;
  dataCancelcheck: any;
  invo: any;
  etick: any;
  disabled: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController) {
    //this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.todayDate = momenttimezone.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    this.konv = localStorage.getItem('seskonv');
    this.idm = localStorage.getItem('sesidman');
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting Your Order Data…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/getorder', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listorder = JSON.parse(JSON.stringify(res));
          this.status = this.listorder.status;
          console.log(res)
          loader.dismiss()
          if (this.listorder.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          } else {
            this.dataorder = this.listorder.dataorder
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
            this.reSearch1();
          });
    });
  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }
  convDate(dt: any) {
    let tgl = moment(dt).format('DD MMMM YYYY');
    return tgl;
  }

  convDatetime(dt: any) {
    let tgl = moment(dt).format('DD MMMM YYYY HH:mm:ss');
    return tgl;
  }

  reSearch(event) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    console.log(data);
    this.http.post('https://sunholidaystyle.com/api/hb/getorder', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.listorder = JSON.parse(JSON.stringify(res));
        console.log(res)
        event.complete();
        if (this.listorder.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Sorry, Internal Server Error, Please Try Again',
            duration: 3000,
            position: 'middle',
            cssClass: 'toastError'
          });
          toast.present();
        } else {
          this.dataorder = this.listorder.dataorder
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

  reSearch1() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman')
    };
    let loader = this.loading.create({
      content: 'Getting Your Order Data…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/getorder', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.listorder = JSON.parse(JSON.stringify(res));
          console.log(res)
          loader.dismiss()
          //event.complete();
          if (this.listorder.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
          } else {
            this.dataorder = this.listorder.dataorder
          }
        },
          error => {
            loader.dismiss()
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderhotelPage');
  }

  allData = []
  issOrder(price: any, hotelid: any, orderid: any, fname: any, lname: any, remarks: any, rooms: any, adults: any, childs: any, childage: any) {
    //console.log(fname.length)
    this.allData.push({ "hotelid": hotelid, "idman": localStorage.getItem('sesidman'), "ratekey": orderid, "firstname": fname, "lastname": lname, "konv": this.konv, "remarks": remarks, "rooms": rooms, "adults": adults, "childs": childs, "language": "ENG", "childage": childage })
    console.log(this.allData[0]);
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
    /// edit neno
    this.disabled="true"; 
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
              let headers = new Headers();
              headers.append('Accept', 'application/json');
              headers.append('Content-Type', 'application/json');
              let options = new RequestOptions({ headers: headers });
              let loader = this.loading.create({
                content: 'Issued Your Order…',
              });
              loader.present().then(() => {
                this.http.post('https://sunholidaystyle.com/issuedhotelhb', this.allData[0], options)
                  .map(res => res.json())
                  .subscribe(res => {
                    console.log(res)
                    this.dataIssued = JSON.parse(JSON.stringify(res));
                    loader.dismiss()
                    if (this.dataIssued.status === 1) {
                      let toast = this.toastCtrl.create({
                        message: (this.dataIssued.message),
                        duration: 3000,
                        position: 'middle',
                        cssClass: 'toastSuccess'
                      });
                      toast.present();
                      this.reSearch1();
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
                    // edit neno
                    this.disabled=null; 
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

  delbookOrder(bcode: any, oid: any) {
    console.log(bcode + ' ' + oid)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idman: localStorage.getItem('sesidman'),
      bookref: bcode,
      ratekey: oid,
      konv: this.konv
    };
    let loader = this.loading.create({
      content: 'Cancelling your order…',
    });
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/getcancelbook', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          this.dataCancelbook = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.dataCancelbook.status === 1) {
            let toast = this.toastCtrl.create({
              message: (this.dataCancelbook.message),
              duration: 3000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
            this.reSearch1();
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

  delcheckOrder(oid: any) {
    console.log(oid)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      ratekey: oid
    };
    let loader = this.loading.create({
      content: 'Cancelling your order…',
    });
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/getcancelcheckout', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          this.dataCancelcheck = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.dataCancelcheck.status === 1) {
            let toast = this.toastCtrl.create({
              message: (this.dataCancelcheck.message),
              duration: 3000,
              position: 'middle',
              cssClass: 'toastSuccess'
            });
            toast.present();
            this.reSearch1();
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

  downInvoice(sidm: any, sratekey: any, shotelid: any, skonv: any, sbcode: any) {
    console.log(sidm + ' ' + sratekey + ' ' + shotelid + ' ' + skonv + ' ' + sbcode)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idm: sidm,
      ratekey: sratekey,
      hotelid: shotelid,
      konv: skonv,
      bcode: sbcode
    }
    let loader = this.loading.create({
      content: 'Download Invoice…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/downinvoicehotelhbjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.invo = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.invo.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your Invoice Failed To Download, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            window.open(this.invo.url, '_system')
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

  downEticket(sidm: any, sratekey: any, shotelid: any, skonv: any, sbcode: any) {
    console.log(sidm + ' ' + sratekey + ' ' + shotelid + ' ' + skonv + ' ' + sbcode)
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idm: sidm,
      ratekey: sratekey,
      hotelid: shotelid,
      konv: skonv,
      bcode: sbcode
    }
    let loader = this.loading.create({
      content: 'Download E-Ticket…',
    });
    console.log(data);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/downetickethotelhbjson', data, options)
        .map(res => res.json())
        .subscribe(res => {
          this.etick = JSON.parse(JSON.stringify(res));
          loader.dismiss()
          if (this.etick.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Your E-Voucher Failed To Download, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastWarning'
            });
            toast.present();
          } else {
            window.open(this.etick.url, '_system')
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

  showPrompt(orderid:any) {
    const prompt = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Apakah anda yakin untuk membatalkan order hotel ini , point anda akan tetap terpotong !',
      buttons: [
        {
          text: 'Kembali',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Lanjutkan',
          handler: () => {
            this.delcheckOrder(orderid);
          }
        }
      ]
    });
    prompt.present();
  }

}
