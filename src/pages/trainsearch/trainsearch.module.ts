import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainsearchPage } from './trainsearch';

@NgModule({
  declarations: [
    TrainsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainsearchPage),
  ],
})
export class TrainsearchPageModule {}
