import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { GuestGuard, AuthGuard } from './guards';
import { AttachTokenInterceptor } from './interceptors';

@NgModule({
  providers: [
    GuestGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {}
