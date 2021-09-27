import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopInfoComponent } from './pop-info/pop-info.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PopInfoComponent
  ],
  exports:[
    PopInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
