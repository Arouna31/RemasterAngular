import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    PublicModule,
    ProtectedModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule {
  //Empêcher CoreModule d'être appelé plusieurs fois
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
     throw new Error('CoreModule is already loaded.');
    }
   }
 }
