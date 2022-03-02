import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}, {
  path: 'articles',
  loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
}, {
  path: 'categories',
  loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
}, {
  path: '',
  redirectTo: 'articles',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
