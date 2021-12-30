import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoteldetailPage } from './hoteldetail';

@NgModule({
  declarations: [
    HoteldetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HoteldetailPage),
  ],
})
export class HoteldetailPageModule {}
