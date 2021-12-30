import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyorderlistPage } from './myorderlist';

@NgModule({
  declarations: [
    MyorderlistPage,
  ],
  imports: [
    IonicPageModule.forChild(MyorderlistPage),
  ],
})
export class MyorderlistPageModule {}
