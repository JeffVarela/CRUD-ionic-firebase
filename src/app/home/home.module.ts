import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PopInfoComponent } from '../components/pop-info/pop-info.component';
import { ComponentsModule } from '../components/components.module';
import { Pipe } from '../pipe/pipe.module';


@NgModule({

  entryComponents: [
    PopInfoComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    Pipe
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
