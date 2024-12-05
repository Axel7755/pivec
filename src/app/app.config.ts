import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { environment } from '../environments/environments';

const config: SocketIoConfig = {url: `${environment.apiUrl}:8080`, options: {withCredentials: true}};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),  importProvidersFrom(SocketIoModule.forRoot(config)), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch())]
};
