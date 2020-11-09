import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { httpInterceptorProviders } from '@core/interceptors';
import { appInitializerProviders } from '@core/initializers';
import { FormlyConfigModule } from './formly-config.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// FireStorage
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
// -- FireStorage
import { environment } from '@env/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    FormlyConfigModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFirestoreModule, // auth
    AngularFireStorageModule, // storage
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), 
  ],
  providers: [
    httpInterceptorProviders, 
    appInitializerProviders,
    {provide: BUCKET, useValue:'gs://online-store-6fdd2.appspot.com/'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
