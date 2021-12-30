import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ShowairportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showairport',
  templateUrl: 'showairport.html',
})
export class ShowairportPage {
  @ViewChild('input') myInput;
  titleText: string = "";
  public airportName: string = '';
  public airportCode: string = '';

  airportData: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.titleText = this.navParams.get("titleText");
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ShowairportPage');
  //   // setTimeout(() => {
  //   //   this.myInput.setFocus();
  //   // }, 200)
  // }

  ionViewDidEnter() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 200)
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  checkChange(kode: any, nama: any, tipe: any) {
    let data = {
      aircode: kode,
      airname: nama,
      airtype: tipe
    }
    this.viewCtrl.dismiss(data);
  }

  showData() {
    this.airportData = null;
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      querysrc: this.airportName
    };
    console.log(data)
    this.http.post('https://sunholidaystyle.com/api/dataairport', data, options)
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res)
        this.airportData = JSON.parse(JSON.stringify(res));

      },
        error => {
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

}
