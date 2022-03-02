import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Category } from 'src/app/categories/category.model';
import { ArticlesFormsService } from '../../articles-forms.service';

import { ArticlesService } from '../../articles.service';
import { CREATE_ARTICLE_PAGE_TITLE } from '../../constants';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  private _isCreating$ = new BehaviorSubject<boolean>(false);

  form: FormGroup;
  isCreating$: Observable<boolean>;
  categories: Array<Category>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private articlesFormsService: ArticlesFormsService,
    private articlesService: ArticlesService
  ) {
    this.form = this.articlesFormsService.createArticleForm();
    this.isCreating$ = this._isCreating$.asObservable();
    this.categories = (this.route.snapshot.data as { categories: Array<Category>; }).categories;
    this.title.setTitle(CREATE_ARTICLE_PAGE_TITLE);
  }

  create() {
    if (this.form.invalid) return;

    this._isCreating$.next(true);

    const { title, body, categoryId } = this.form.value;
    this.articlesService.createArticle({ title, body, category_id: +categoryId })
      .pipe(finalize(() => this._isCreating$.next(false)))
      .subscribe(this.onCreateSuccess.bind(this));
  }

  private onCreateSuccess() {
    this.form.reset();
  }
}
