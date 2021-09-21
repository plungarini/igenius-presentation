import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainVideoComponent } from './main-video.component';
import { MainVideoRoutingModule } from './main-video-routing.module';


@NgModule({
  declarations: [
    MainVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainVideoRoutingModule
  ]
})
export class MainVideoModule { }
