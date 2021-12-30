import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SelectairportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectairport',
  templateUrl: 'selectairport.html',
})
export class SelectairportPage {

  titleText: string = "";
  searchText: string = "";
  items: any[];
  filterItems: any[];
  selectedItems: any[] = [];
  displayOk: any = false;

  constructor(public http: Http,
    public loading: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController/*,public constant: Constants*/) {
    let loadair = this.loading.create({
      content: 'Loading data…',
      spinner: 'dots',
    });
    loadair.present().then(() => {
      this.http.get('https://sunholidaystyle.com/api/getairportjson2')
        .map(res => res.json())
        .subscribe(res => {
          this.items = JSON.parse(JSON.stringify(res));
          loadair.dismiss();
        },
          error => {
            loadair.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Sorry, Airport data not loaded, Please Try Again',
              duration: 3000,
              position: 'middle',
              cssClass: 'toastError'
            });
            toast.present();
            this.navCtrl.pop();
            console.log(error);
          })
    })
    this.titleText = this.navParams.get("titleText");
    this.FilterItems();
  }

  FilterItems() {
    this.filterItems = this.items;
    if (this.searchText.trim() !== '') {
      this.filterItems = this.filterItems.filter((item) => {
        return (item.text.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
      });
    }
  }

  CheckChange(item: any) {
    for (let index = 0; index < this.filterItems.length; index++) {
      const element = this.filterItems[index];
      if (element.airport_name == item.airport_name) {
        this.filterItems[index].selected = true;
        this.selectedItems = element;
      } else {
        this.filterItems[index].selected = false;
      }
    }
  }

  CloseModel() {
    this.viewCtrl.dismiss();
  }

  DoneModel() {
    this.viewCtrl.dismiss(this.selectedItems);
  }

}