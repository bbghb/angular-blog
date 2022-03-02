import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryResolver } from './category.resolver';
import { CategoryCreateComponent } from './components/category-create/category-create.component';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  canActivate: [AuthGuard]
}, {
  path: 'create',
  component: CategoryCreateComponent,
  canActivate: [AuthGuard]
}, {
  path: ':id',
  component: CategoryComponent,
  canActivate: [AuthGuard],
  resolve: {
    category: CategoryResolver
  },
}, {
  path: ':id/edit',
  component: CategoryEditComponent,
  canActivate: [AuthGuard],
  resolve: {
    category: CategoryResolver
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
