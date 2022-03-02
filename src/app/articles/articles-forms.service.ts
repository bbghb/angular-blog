import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from './models/article.model';
import { ARTICLE_TITLE_MAX_LENGTH, ARTICLE_BODY_MAX_LENGTH } from './constants';

@Injectable()
export class ArticlesFormsService {
  constructor(private fb: FormBuilder) {}

  createArticleForm(article?: Article): FormGroup {
    return this.fb.group({
      title: [article?.title || '', [
        Validators.required,
        Validators.maxLength(ARTICLE_TITLE_MAX_LENGTH)
      ]],
      categoryId: [article?.category?.id || '', [
        Validators.required,
        Validators.min(1)
      ]],
      body: [article?.body || '', [
        Validators.required,
        Validators.maxLength(ARTICLE_BODY_MAX_LENGTH)]
      ]
    });
  }
}
