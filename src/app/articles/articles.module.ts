import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticlesComponent } from './components/articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesListItemComponent } from './components/articles-list-item/articles-list-item.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './components/article/article.component';
import { AppCommonModule } from '../common/common.module';
import { ArticleCommentsComponent } from './components/article-comments/article-comments.component';
import { ArticleCommentComponent } from './components/article-comment/article-comment.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { ArticleResolver } from './article.resolver';
import { CategoriesModule } from '../categories/categories.module';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticlesFormsService } from './articles-forms.service';



@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticlesListItemComponent,
    ArticleComponent,
    ArticleCommentsComponent,
    ArticleCommentComponent,
    ArticleFormComponent,
    ArticleEditComponent,
    ArticleCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticlesRoutingModule,
    AppCommonModule,
    CategoriesModule
  ],
  providers: [
    ArticleResolver,
    ArticlesFormsService
  ]
})
export class ArticlesModule {}
