import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorComponent } from './components/paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { SpinnerButtonComponent } from './components/spinner-button/spinner-button.component';
import { TrimInputDirective } from './directives/trim-input.directive';



@NgModule({
  declarations: [
    PaginatorComponent,
    SpinnerButtonComponent,
    TrimInputDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PaginatorComponent,
    SpinnerButtonComponent,
    TrimInputDirective
  ]
})
export class AppCommonModule { }
