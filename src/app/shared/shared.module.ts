import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VimeoPlayerComponent } from './components/vimeo-player/vimeo-player.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  declarations: [
    VimeoPlayerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  exports: [
    VimeoPlayerComponent,
  ]
})
export class SharedModule { }
