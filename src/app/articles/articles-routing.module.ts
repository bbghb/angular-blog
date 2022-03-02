import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { AuthGuard } from '../core/guards';
import { ArticleResolver } from './article.resolver';
import { CategoriesResolver } from '../categories/categories.resolver';
import { ArticleCreateComponent } from './components/article-create/article-create.component';

const routes: Routes = [{
  path: '',
  component: ArticlesComponent
}, {
  path: 'create',
  component: ArticleCreateComponent,
  canActivate: [AuthGuard],
  resolve: {
    categories: CategoriesResolver
  }
}, {
  path: ':id',
  component: ArticleComponent,
  resolve: {
    article: ArticleResolver
  }
}, {
  path: ':id/edit',
  component: ArticleEditComponent,
  canActivate: [AuthGuard],
  resolve: {
    article: ArticleResolver,
    categories: CategoriesResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
