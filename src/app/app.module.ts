import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiKeyInterceptorService} from '@scripter/services/interceptor/api-key-interceptor.service';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {ModalModule} from '@scripter/components/common/modal/modal.module';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from '@scripter/components/common/toast/toast.module';
import {RouterProgressModule} from '@scripter/components/common/router-progress/router-progress.module';
import { ServiceWorkerModule } from '@angular/service-worker';

const {
  clientId,
} = environment;

const gapiClientConfig: NgGapiClientConfig = {
  client_id: clientId,
  discoveryDocs: [],
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/blogger.readonly',
    'https://www.googleapis.com/auth/blogger',
  ].join(' '),
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    ModalModule,
    BrowserAnimationsModule,
    ToastModule,
    RouterProgressModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptorService,
      multi: true,
    },
    SubscriptionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
