
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { FCM } from '@ionic-native/fcm';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { CalendarModule } from "ion2-calendar";
import { DataTablesModule } from 'angular-datatables';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Globalization } from '@ionic-native/globalization';


//#region PAGE
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//flight
import { FlightPage } from '../pages/flight/flight';
import { FlightresultPage } from '../pages/flightresult/flightresult';
import { Flightresult2Page } from '../pages/flightresult2/flightresult2';
import { FlightresultfilterPage } from '../pages/flightresult/flightresultfilter/flightresultfilter';
import { LoginPage } from '../pages/login/login';
import { BasePage } from '../pages/base/base';
//import { GetflightPage } from '../pages/getflight/getflight';
import { Getflight2Page } from '../pages/getflight2/getflight2';
import { PrevflightPage } from '../pages/prevflight/prevflight';
//account page
import { AccountPage } from '../pages/account/account';
import { MyorderPage } from '../pages/myorder/myorder';
import { DetailPage } from '../pages/detail/detail';
import { ChangepassPage } from '../pages/changepass/changepass';
import { HispaymentPage } from '../pages/hispayment/hispayment';
import { FeepaymentPage } from '../pages/feepayment/feepayment';
import { HispointPage } from '../pages/hispoint/hispoint';
import { DetailpointPage } from '../pages/detailpoint/detailpoint';
import { DetailpaymentPage } from '../pages/detailpayment/detailpayment';
import { DetailfeepaymentPage } from '../pages/detailfeepayment/detailfeepayment';
import { SettingsPage } from '../pages/settings/settings';
import { ChangemailPage } from '../pages/changemail/changemail';
import { ShowtourPage } from '../pages/showtour/showtour';
import { ShowairportPage } from '../pages/showairport/showairport';
import { DiscountPage } from '../pages/discount/discount';
import { ShowimagePage } from '../pages/showimage/showimage';
import { MyprofilePage } from '../pages/myprofile/myprofile';
//test page
import { TesautocompletePage } from '../pages/tesautocomplete/tesautocomplete';
import { TestPage } from '../pages/test/test';
//hotel
import { HotelPage } from '../pages/hotel/hotel';
import { ShowhotelPage } from '../pages/showhotel/showhotel';
import { HotelresultPage } from '../pages/hotelresult/hotelresult';
import { GethotelPage } from '../pages/gethotel/gethotel';
import { MyorderhotelPage } from '../pages/myorderhotel/myorderhotel';
import { MyorderlistPage } from '../pages/myorderlist/myorderlist';
import { HoteldetailPage } from '../pages/hoteldetail/hoteldetail';
import { ShscardPage } from '../pages/shscard/shscard';
import { ShowqrPage } from '../pages/showqr/showqr';
import { NotificationPage } from '../pages/notification/notification';
//train
import { TrainsearchPage} from '../pages/trainsearch/trainsearch';
import { ShowstationPage } from '../pages/showstation/showstation';
import { TrainresultPage } from '../pages/trainresult/trainresult';
//activity
import { ActivitysearchPage } from '../pages/activitysearch/activitysearch';
import { ActivityresultPage } from '../pages/activityresult/activityresult';


//#region MODULE

//flight
import { FlightPageModule } from '../pages/flight/flight.module';
import { FlightresultPageModule } from '../pages/flightresult/flightresult.module';
import { Flightresult2PageModule } from '../pages/flightresult2/flightresult2.module';
import { FlightresultfilterPageModule } from '../pages/flightresult/flightresultfilter/flightresultfilter.module';
//import { GetflightPageModule } from '../pages/getflight/getflight.module';
import { Getflight2PageModule } from '../pages/getflight2/getflight2.module';
//account page
import { AccountPageModule } from '../pages/account/account.module';
import { BasePageModule } from '../pages/base/base.module';
import { ChangemailPageModule } from '../pages/changemail/changemail.module';
import { ChangepassPageModule } from '../pages/changepass/changepass.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { DetailpointPageModule } from '../pages/detailpoint/detailpoint.module';
import { DetailpaymentPageModule } from '../pages/detailpayment/detailpayment.module';
import { DetailfeepaymentPageModule } from '../pages/detailfeepayment/detailfeepayment.module';
import { FeepaymentPageModule } from '../pages/feepayment/feepayment.module';
import { HispaymentPageModule } from '../pages/hispayment/hispayment.module';
import { HispointPageModule } from '../pages/hispoint/hispoint.module';
import { ShscardPageModule } from '../pages/shscard/shscard.module';
import { ShowqrPageModule } from '../pages/showqr/showqr.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MyorderPageModule } from '../pages/myorder/myorder.module';
import { PrevflightPageModule } from '../pages/prevflight/prevflight.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { ShowtourPageModule } from '../pages/showtour/showtour.module';
import { ShowairportPageModule } from '../pages/showairport/showairport.module';
import { DiscountPageModule } from '../pages/discount/discount.module';
import { ShowimagePageModule } from '../pages/showimage/showimage.module';
import { MyprofilePageModule } from '../pages/myprofile/myprofile.module';

//test page
import { TesautocompletePageModule } from '../pages/tesautocomplete/tesautocomplete.module';
import { TestPageModule } from '../pages/test/test.module';
//hotel page
import { HotelPageModule } from '../pages/hotel/hotel.module';
import { ShowhotelPageModule } from '../pages/showhotel/showhotel.module';
import { HotelresultPageModule } from '../pages/hotelresult/hotelresult.module';
import { GethotelPageModule } from '../pages/gethotel/gethotel.module';
import { MyorderhotelPageModule } from '../pages/myorderhotel/myorderhotel.module';
import { MyorderlistPageModule } from '../pages/myorderlist/myorderlist.module';
import { HoteldetailPageModule } from '../pages/hoteldetail/hoteldetail.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
//train
import { TrainsearchPageModule} from '../pages/trainsearch/trainsearch.module';
import { ShowstationPageModule } from '../pages/showstation/showstation.module';
import { TrainresultPageModule } from '../pages/trainresult/trainresult.module';
//activity
import { ActivitysearchPageModule } from '../pages/activitysearch/activitysearch.module';
import { ActivityresultPageModule } from '../pages/activityresult/activityresult.module';




@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CalendarModule,
    DataTablesModule,
    AccountPageModule,
    BasePageModule,
    ChangemailPageModule,
    ChangepassPageModule,
    DetailPageModule,
    DetailpointPageModule,
    DetailpaymentPageModule,
    DetailfeepaymentPageModule,
    FeepaymentPageModule,
    FlightPageModule,
    FlightresultPageModule,
    Flightresult2PageModule,
    FlightresultfilterPageModule,
    //GetflightPageModule,
    Getflight2PageModule,
    HispaymentPageModule,
    HispointPageModule,
    LoginPageModule,
    MyorderPageModule,
    PrevflightPageModule,
    SettingsPageModule,
    ShowtourPageModule,
    ShowairportPageModule,
    DiscountPageModule,
    ShowimagePageModule,
    TesautocompletePageModule,
    TestPageModule,
    HotelPageModule,
    ShowhotelPageModule,
    HotelresultPageModule,
    GethotelPageModule,
    MyorderhotelPageModule,
    MyorderlistPageModule,
    HoteldetailPageModule,
    ShscardPageModule,
    ShowqrPageModule,
    NotificationPageModule,
    TrainsearchPageModule,
    ShowstationPageModule,
    TrainresultPageModule,
    ActivitysearchPageModule,
    ActivityresultPageModule,
    MyprofilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    FlightPage,
    FlightresultPage,
    Flightresult2Page,
    FlightresultfilterPage,
    LoginPage,
    BasePage,
    //GetflightPage,
    Getflight2Page,
    PrevflightPage,
    MyorderPage,
    DetailPage,
    ChangepassPage,
    HispaymentPage,
    FeepaymentPage,
    HispointPage,
    DetailpointPage,
    DetailpaymentPage,
    DetailfeepaymentPage,
    SettingsPage,
    ChangemailPage,
    ShowtourPage,
    ShowairportPage,
    DiscountPage,
    ShowimagePage,
    TesautocompletePage,
    TestPage,
    HotelPage,
    ShowhotelPage,
    HotelresultPage,
    GethotelPage,
    MyorderhotelPage,
    MyorderlistPage,
    HoteldetailPage,
    ShscardPage,
    ShowqrPage,
    NotificationPage,
    TrainsearchPage,
    ShowstationPage,
    TrainresultPage,
    ActivitysearchPage,
    ActivityresultPage,
    MyprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    FCM,
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    Camera,
    InAppBrowser,
    Globalization,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
