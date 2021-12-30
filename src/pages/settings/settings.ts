import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File, FileEntry } from '@ionic-native/file';
import * as moment from 'moment';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ChangepassPage } from '../changepass/changepass';
import { ChangemailPage } from '../changemail/changemail';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  imageURI: any;
  imageFileName: any;
  GetImageNameUpload: any;
  todayDate: any
  imageFileNameMod: any;
  base64Image: any;
  image: any;
  idman: any;
  resprof: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    public http: Http,
    public loadingCtrl: LoadingController) {
    this.idman = localStorage.getItem('sesidman');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changepass() {
    this.navCtrl.push(ChangepassPage);
  }

  changemail() {
    this.navCtrl.push(ChangemailPage);
  }

  hasLogin() {
    if (localStorage.getItem('sesidman') !== null) {
      return true;
    } else if (localStorage.getItem('sesidman') === null) {
      return false;
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Image Source',
      buttons: [
        {
          text: 'From Camera',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'From Gallery',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  getImage(sourceType) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      targetWidth: 512,
      targetHeight: 512,
      //saveToPhotoAlbum: true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagePath) => {
      this.imageURI = imagePath;
      this.image = (<any>window).Ionic.WebView.convertFileSrc(imagePath);
      this.base64Image = "data:image/jpeg;base64," + this.imageURI;
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo => {
            let files = fileInfo as FileEntry;
            files.file(success => {
              this.imageFileName = success.name;
              this.todayDate = new Date();
              this.imageFileNameMod = moment(this.todayDate).format('DD-MM-YYYY_HH:mm:ss') + '' + this.imageFileName;
            });
          }, err => {
            console.log(err);
            throw err;
          });
        });
      loader.dismiss();
    }, (err) => {
      console.log(err);
      this.presentToast(err);
      loader.dismiss();
    });
  }
  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let URL = "https://sunholidaystyle.com/images/upload";

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageFileNameMod,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    fileTransfer.upload(this.imageURI, URL, options)
      .then((data) => {
        this.GetImageNameUpload = this.imageFileNameMod;
        loader.dismiss();
        //this.presentToast("Image uploaded successfully");

        let dataprof = {
          idman: this.idman,
          imgurl: this.imageFileNameMod
        };
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post('https://sunholidaystyle.com/api/upprof', dataprof, options)
          .map(res => res.json())
          .subscribe(res => {
            this.resprof = JSON.parse(JSON.stringify(res));
            if (this.resprof.status === 0) {
              this.presentToast(this.resprof.message);
            } else {
              this.presentToast(this.resprof.message);
              window.localStorage.setItem('sesprofpic', 'https://sunholidaystyle.com/images/member/' + this.imageFileNameMod);
            }
          },
            error => {
              console.log(error);
              loader.dismiss();
              this.presentToast(error);
            });
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}

