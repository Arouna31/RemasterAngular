import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeFeatureCardComponent } from './home-feature-card/home-feature-card.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeFeatureCardComponent,
    HomeFeaturesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
