import {ApplicationConfig, Provider, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {authInterceptor} from "./services/auth.interceptor";



export const appConfig: ApplicationConfig = {
  providers:
      [

          provideZoneChangeDetection({ eventCoalescing: true }),
          provideRouter(routes),
          provideClientHydration(),
          provideHttpClient(withInterceptorsFromDi()),
          {
              provide:HTTP_INTERCEPTORS,
              useClass:authInterceptor,
              multi:true
          },
          provideAnimations(),
          provideToastr({
              positionClass: 'toast-bottom-right',
          }),
      ]
};


