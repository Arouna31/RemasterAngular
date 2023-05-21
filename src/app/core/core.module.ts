import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastrComponent } from './components/toastr/toastr.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoaderComponent,
    ToastrComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    PublicModule,
    ProtectedModule,
    AlertModule.forRoot(),
  ],
  exports: [NavbarComponent, FooterComponent, LoaderComponent, ToastrComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  //Empêcher CoreModule d'être appelé plusieurs fois
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
