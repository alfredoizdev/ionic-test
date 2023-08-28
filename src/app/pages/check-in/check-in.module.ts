import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckInPageRoutingModule } from './check-in-routing.module';

import { CheckInPage } from './check-in.page';
import { WavyComponent } from 'src/app/components/wavy/wavy.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CheckInPageRoutingModule],
  declarations: [CheckInPage, WavyComponent],
})
export class CheckInPageModule {}
