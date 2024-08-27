import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpService } from '../services/http.service';
import { CardComponent } from '../components/card/card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CurrencyPipe,
    HttpClientModule
  ],
  declarations: [HomePage, CardComponent],
  providers: [HttpService],
  exports:[CardComponent]
})
export class HomePageModule {}
