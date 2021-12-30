import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, /*Headers, RequestOptions*/ } from '@angular/http';
import 'rxjs/add/operator/map';
// import * as moment from 'moment';

/**
 * Generated class for the ActivityresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activityresult',
  templateUrl: 'activityresult.html',
})
export class ActivityresultPage {
  activity      : any;
  activitydata  : any;
  konv          : any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public loading: LoadingController,
    public toastCtrl: ToastController) {
    if (localStorage.getItem('seskonv') === undefined || localStorage.getItem('seskonv') === '' || localStorage.getItem('seskonv') === null) {
      this.konv = 6705;
    } else {
      this.konv = localStorage.getItem('seskonv');
    }
    this.activity     = JSON.parse(JSON.stringify(navParams.get('activity')));

    console.log("masuk");

    // console.log(this.activity);
    this.activitydata   = this.activity.data;
    console.log(this.activitydata);

  }

  getPoint(prc: any) {
    return Math.round(prc / this.konv);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityresultPage');
  }

}
