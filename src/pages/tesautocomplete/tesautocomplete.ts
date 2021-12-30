import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TesautocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tesautocomplete',
  templateUrl: 'tesautocomplete.html',
})
export class TesautocompletePage {
  titleText: string = "";
  public hotelName: string = '';
  public hotelCode: string = '';

  hotelData: any;

  constructor(public navCtrl: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
      this.titleText = this.navParams.get("titleText");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TesautocompletePage');
  }

  checkChange(kode: any, nama: any){
    this.hotelName = nama;
    this.hotelCode = kode;
    this.viewCtrl.dismiss(kode, nama);
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
    this.http.post('https://sunholidaystyle.com/api/hb/datahotels', data, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res)
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
