import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainVideoComponent } from './main-video.component';

const routes: Routes = [
  {
    path: '',
    component: MainVideoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainVideoRoutingModule { }
