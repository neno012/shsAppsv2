// import { Http } from '@angular/http';
import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav, ToastController, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { HttpClient } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  http: HttpClient;

  constructor(private platform: Platform,
    // public http: HttpClient,
    public toastCtrl: ToastController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fcm: FCM,
    public alertCtrl: AlertController, 
    menuCtrl : MenuController,
    public  app: App
    //public navCtrl: Nav
    ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // EXIT CONFRIMATION
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive(); 
          
        if(activeView.name === 'BasePage' || activeView.name === 'MyorderlistPage' || activeView.name === 'DiscountPage' || activeView.name === 'AccountPage') {
          const alert = this.alertCtrl.create({
            cssClass: 'alertDanger',
            title: 'Exit the Application',
            message: 'Are you sure you want to exit?',
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
              
            },{
                text: 'Exit',
                handler: () => {
                  this.platform.exitApp();
                }
            }]
        });
        alert.present();
        }
        else{
          nav.pop();
        }
      });
      
      this.statusBar.backgroundColorByHexString('#cc5200');
      // this.splashScreen.hide();
      this.pushSetup();
      // this.updatenotif();
    });
      
  }

  

  exitApp() {
    this.platform.exitApp();
  }

  pushSetup() {
    this.fcm.subscribeToTopic('allshs');

    this.fcm.getToken().then(token => {
      console.log(`The token is ${token}`);
      window.localStorage.setItem('stokenfcm', token);
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
        let confirmAlert = this.alertCtrl.create({
          title: data.title,
          message: data.shortmessage,
          cssClass: 'alertDanger',
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              this.nav.push(DetailPage, { dataNotif: data });
            }
          }]
        });
        confirmAlert.present();
      } else {
        console.log("Received in foreground");
        this.nav.push(DetailPage, { dataNotif: data });
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      window.localStorage.setItem('stokenfcm', token);
    });
  }
}

