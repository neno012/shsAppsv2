import { ActivityresultPage } from '../../pages/activityresult/activityresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Http, Headers, /*RequestOptions*/ } from '@angular/http';
import 'rxjs/add/operator/map';
// import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
// import * as moment from 'moment';

/**
 * Generated class for the ActivitysearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activitysearch',
  templateUrl: 'activitysearch.html',
})
export class ActivitysearchPage {
  public activity: any;
  public destination: any;
  public adult: any;
  public child: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitysearchPage');
  }

  Search() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    let data = {
      destination: this.destination,
      activity: this.activity,
      adult: this.adult,
      child: this.child
    };
    let loader = this.loading.create({
      content: 'Searching Your Activity…',
    });
    console.log(data)
    //console.log(this.datedep)
    window.localStorage.setItem('destination', this.destination)
    window.localStorage.setItem('activity', this.activity)
    window.localStorage.setItem('adult', this.adult)
    window.localStorage.setItem('child', this.child)
    loader.present().then(() => {
      this.http.post('https://sunholidaystyle.com/api/shsapi/activity/activity', data)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res)
          loader.dismiss();
          this.navCtrl.push(ActivityresultPage, {
            activity: res
          });
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
