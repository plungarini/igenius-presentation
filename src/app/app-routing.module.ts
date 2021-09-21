import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MainVideoGuard } from './main-video/main_video.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'vision',
    canActivate: [MainVideoGuard],
    loadChildren: () => import('./main-video/main-video.module').then(m => m.MainVideoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes/* , { enableTracing: true } */)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
