import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AppCommonModule } from '../common/common.module';
import { CategoryComponent } from './components/category/category.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryResolver } from './category.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoriesFormsService } from './categories-forms.service';
import { CategoriesResolver } from './categories.resolver';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppCommonModule,
    CategoriesRoutingModule
  ],
  providers: [
    CategoryResolver,
    CategoriesResolver,
    CategoriesFormsService
  ]
})
export class CategoriesModule {}
