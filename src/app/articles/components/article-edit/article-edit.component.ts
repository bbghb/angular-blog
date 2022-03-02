import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { Article } from '../../models/article.model';
import { Category } from '../../../categories/category.model';
import { ArticlesService } from '../../articles.service';
import { ArticlesFormsService } from '../../articles-forms.service';
import { EDIT_ARTICLE_PAGE_TITLE } from '../../constants';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent {
  private _isEditing$ = new BehaviorSubject<boolean>(false);

  article: Article;
  categories: Array<Category>;
  form: FormGroup;
  isEditing$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private articlesFormsService: ArticlesFormsService,
    private articlesService: ArticlesService
  ) {
    const { article, categories } = this.route.snapshot.data as { article: Article; categories: Array<Category>; };
    this.article = article;
    this.categories = categories;
    this.form = this.articlesFormsService.createArticleForm(this.article);
    this.isEditing$ = this._isEditing$.asObservable();
    this.title.setTitle(EDIT_ARTICLE_PAGE_TITLE);
  }

  edit() {
    if (this.form.invalid) return;

    this._isEditing$.next(true);

    const { title, body, categoryId } = this.form.value;
    this.articlesService.updateArticle(this.article.id, { title, body, category_id: +categoryId })
      .pipe(finalize(() => this._isEditing$.next(false)))
      .subscribe();
  }
}
