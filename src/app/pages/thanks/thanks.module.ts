import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThanksPageRoutingModule } from './thanks-routing.module';

import { ThanksPage } from './thanks.page';
import { WavyComponent } from 'src/app/components/wavy/wavy.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ThanksPageRoutingModule],
  declarations: [ThanksPage, WavyComponent],
})
export class ThanksPageModule {}
