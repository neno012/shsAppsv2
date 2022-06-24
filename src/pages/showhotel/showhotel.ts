import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ShowhotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showhotel',
  templateUrl: 'showhotel.html',
})
export class ShowhotelPage {
  @ViewChild('input') myInput;
  titleText: string = "";
  public hotelName: string = '';
  public hotelCode: string = '';
  public hotelCategory: string = '';

  hotelData: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.titleText = this.navParams.get("titleText");
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 200)
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  checkChange(kode: any, nama: any, kategori: any) {
    let data = {
      hotcode: kode,
      hotname: nama,
      hotcategory: kategori
    }
    this.viewCtrl.dismiss(data);
  }

  showData() {
    this.hotelData = null;
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      querysrc: this.hotelName
    };
    console.log(data)
    //this.http.post('https://sunholidaystyle.com/api/hb/datahotels', data, options)
    this.http.post('https://sunholidaystyle.com/api/traveloka/datahotels', data, options)
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res)
        this.hotelData = JSON.parse(JSON.stringify(res));

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
