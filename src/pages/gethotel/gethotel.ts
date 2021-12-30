import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, App /*, IonicPageModule*/ } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// import { HomePage } from '../../pages/home/home';
import { MyorderhotelPage } from '../../pages/myorderhotel/myorderhotel';

/**
 * Generated class for the GethotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gethotel',
  templateUrl: 'gethotel.html',
})
export class GethotelPage {
  tabBarElement     : any;
  dataPoint         : any;
  nowPoint          : any;
  nowPersen         : any;
  konv              : any;
  jsonhotel         : any;
  jsonhotelrecheck  : any;
  jsonhotelbookable : any;
  ratetype          : any;
  specreq           : any;
  fname             : any;
  lname             : any;
  jumroom           : any;
  ratekey           : any;
  ratecom           : any;
  hotelname         : any;
  roomname          : any;
  price             : any;
  checkin           : any;
  checkout          : any;
  hotelcode         : any;
  boardname         : any;
  room              : any;
  adult             : any;
  children          : any;
  shotel            : any;
  conData           : any;
  jsoncheckout      : any;
  hoteldetailData   : any;

  constructor(
    public navCtrl    : NavController,
    public navParams  : NavParams,
    public http       : Http,
    public loading    : LoadingController,
    public alertCtrl  : AlertController,
    public toastCtrl  : ToastController,
    public appCtrl    : App) {

    this.shotel         = JSON.parse(localStorage.getItem('shotel'))
    this.jumroom        = [];
    this.tabBarElement  = document.querySelector('.tabbar.show-tabbar');

    if (localStorage.getItem('sesidman') === null || localStorage.getItem('sesidman') === '') {
      let toast = this.toastCtrl.create({
        message   : 'Sorry, Please Login First',
        duration  : 3000,
        position  : 'middle'
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
            this.dataPoint  = JSON.parse(JSON.stringify(respoint));
            let dataPnt     = this.dataPoint;
            loaderpersen.dismiss()
            if (dataPnt.status == 1) {
              this.nowPoint   = dataPnt.point;
              this.nowPersen  = dataPnt.persen;
              console.log(this.nowPoint, this.nowPersen)

              if (this.nowPersen >= 50 || this.nowPersen >= '50') {
                this.konv = localStorage.getItem('seskonv');
                this.jsonhotel = JSON.parse(JSON.stringify(navParams.get('jsonhotel')));
                // console.log(this.jsonhotel.ratetype)
                // console.log(this.jsonhotel.hotelcode)
                this.ratetype = this.jsonhotel.ratetype
                this.ratecom  = this.jsonhotel.ratecom
                // console.log(this.jsonhotel.hotelcode)
                let headers1  = new Headers();
                headers1.append('Accept', 'application/json');
                headers1.append('Content-Type', 'application/json');
                let options1 = new RequestOptions({ headers: headers1 });
                let datadtl = {
                  hotelcode: this.jsonhotel.hotelcode,
                  language: "ENG"
                }
                this.http.post('https://sunholidaystyle.com/api/hb/getdetails', datadtl, options1)
                  .map(res1 => res1.json())
                  .subscribe(res1 => {
                    console.log(res1)
                    this.hoteldetailData = JSON.parse(JSON.stringify(res1));
                    console.log(this.hoteldetailData.data.address)
                  },
                    error => {
                    });

                if (this.ratetype === 'BOOKABLE') {
                  console.log(navParams.get('jsonhotel'))
                  this.jsonhotelbookable = JSON.parse(JSON.stringify(navParams.get('jsonhotel')));
                  //this.jumroom = this.jsonhotelbookable.rooms
                  this.conData = {
                    "idman"           : localStorage.getItem('sesidman'),
                    "odi"             : this.jsonhotelbookable.ratekey,
                    "ordertype"       : "hotel",
                    "ordername"       : this.jsonhotelbookable.hotelname,
                    "ordernamedetail" : this.jsonhotelbookable.roomname,
                    "customerprice"   : this.jsonhotelbookable.net,
                    "checkin"         : this.jsonhotelbookable.checkin,
                    "checkout"        : this.jsonhotelbookable.checkout,
                    "hotelcode"       : this.jsonhotelbookable.hotelcode,
                    "board"           : this.jsonhotelbookable.boardname,
                    "room"            : this.jsonhotelbookable.rooms,
                    "adult"           : this.jsonhotelbookable.adults,
                    "children"        : this.jsonhotelbookable.children,
                    "childage"        : this.shotel.childage
                  }
                  for (let i = 1; i <= this.jsonhotelbookable.rooms; i++) {
                    this.jumroom.push({
                      "conFirstName"  : "",
                      "conLastName"   : ""
                    });
                  }
                  console.log(this.jsonhotelbookable)
                  console.log(this.jumroom)
                  let headers = new Headers();
                  headers.append('Accept', 'application/json');
                  headers.append('Content-Type', 'application/json');
                  let options = new RequestOptions({ headers: headers });
                  let data = {
                    idman   : localStorage.getItem('sesidman'),
                    ratekey : this.jsonhotelbookable.ratekey
                  };
                  let loader = this.loading.create({
                    content : 'Getting Your Hotel, Please Wait…',
                  });
                  console.log(data);
                  loader.present().then(() => {
                    this.http.post('https://sunholidaystyle.com/api/hb/inslogorder', data, options)
                      .map(res => res.json())
                      .subscribe(res => {
                        console.log(res)
                        loader.dismiss();

                      },
                        error => {
                          loader.dismiss();
                          console.log(error);
                        });
                  });
                } else if (this.ratetype === 'RECHECK') {
                  let headers = new Headers();
                  headers.append('Accept', 'application/json');
                  headers.append('Content-Type', 'application/json');
                  let options = new RequestOptions({ headers: headers });
                  let data = {
                    idman: localStorage.getItem('sesidman'),
                    ratekey: this.jsonhotel.ratekey
                  };
                  let loader = this.loading.create({
                    content: 'Getting Your Hotel, Please Wait…',
                  });
                  console.log(data);
                  loader.present().then(() => {
                    this.http.post('https://sunholidaystyle.com/api/hb/checkrate', data, options)
                      .map(res => res.json())
                      .subscribe(res => {
                        console.log(res)
                        this.jsonhotelrecheck = JSON.parse(JSON.stringify(res));
                        this.conData = this.jsonhotelrecheck
                        for (let i = 1; i <= this.jsonhotelrecheck.data.hotel.rooms[0].rates[0].rooms; i++) {
                          this.jumroom.push({
                            "conFirstName"  : "",
                            "conLastName"   : ""
                          });
                        }
                        console.log(this.jumroom)
                        loader.dismiss();

                      },
                        error => {
                          loader.dismiss();
                          console.log(error);
                          let toast = this.toastCtrl.create({
                            message   : 'Sorry, Internal Server Error, Please Try Again',
                            duration  : 3000,
                            position  : 'middle',
                            cssClass  : 'toastError'
                          });
                          toast.present();
                          this.navCtrl.pop();
                        });
                  });
                }
              } else {
                let toast = this.toastCtrl.create({
                  message   : 'Sorry, Your Payment Under 50%, Please Make A Payment Above 50%',
                  duration  : 3000,
                  position  : 'middle',
                  cssClass  : 'toastWarning'
                });
                toast.present();
                this.navCtrl.pop();
              }
            } else {
              let toast = this.toastCtrl.create({
                message   : 'Sorry, Data not Loaded',
                duration  : 3000,
                position  : 'middle',
                cssClass  : 'toastWarning'
              });
              toast.present();
              this.navCtrl.pop();
            }
          },
            error => {
              loaderpersen.dismiss();
              console.log(error);
              let toast = this.toastCtrl.create({
                message   : 'Sorry, Internal Server Error, Please Try Again',
                duration  : 3000,
                position  : 'middle',
                cssClass  : 'toastError'
              });
              toast.present();
              this.navCtrl.pop();
            });
      });

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GethotelPage');
  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }

  conFirstName  = []
  conLastName   = []
  childAge      = []
  allData       = []
  confHotel() {
    for (let cfn of this.jumroom) {
      this.conFirstName.push(
        cfn.conFirstName
      );
    }
    for (let cfn of this.jumroom) {
      this.conLastName.push(
        cfn.conLastName
      );
    }
    for (let ca of this.shotel.childage) {
      this.childAge.push(
        ca.age
      );
    }
    console.log(this.conFirstName)
    console.log(this.conLastName)
    console.log(this.childAge)
    this.allData.push(
      {
         "idman"        : localStorage.getItem('sesidman'), 
         "conremarks"   : this.specreq, 
         "confirstname" : this.conFirstName, 
         "conlastname"  : this.conLastName, 
         "ratetype"     : this.ratetype, 
         "ratecom"      : this.ratecom, 
         "condata"      : this.conData, 
         "childage"     : this.childAge 
      }
    )
    //console.log(this.allData[0])
    this.conFirstName = []
    this.conLastName = []
    this.childAge = []

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let loader = this.loading.create({
      content: 'Checkout Your Hotel, Please Wait…',
    });
    console.log(this.allData[0]);
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/hb/checkout', this.allData[0], options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          loader.dismiss();
          this.jsoncheckout = JSON.parse(JSON.stringify(res));
          if (this.jsoncheckout.status === 1 || this.jsoncheckout.status === '1') {
            loader.dismiss()
            const alert = this.alertCtrl.create({
              cssClass: 'alertDanger',
              title: '<center>Success</center>',
              message: 'Success, Your Hotel Has Been Checkout, Please Check Your Order To Issued',
              buttons: [{
                  text: 'Continue to Issued',
                  handler: () => {
                    this.hotelOrder();
                  }
              }]
          });
          alert.present();
            //this.appCtrl.getRootNavById('n4');
          } else {
            let toast = this.toastCtrl.create({
              message: 'Sorry, Internal Server Error, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
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

  hotelOrder(){
    this.navCtrl.push(MyorderhotelPage);
  }

}
