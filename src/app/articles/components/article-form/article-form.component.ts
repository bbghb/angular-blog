import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AbstractFormComponent } from '../../../common/abstract-form.component';
import { Category } from '../../../categories/category.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent extends AbstractFormComponent {
  readonly titleMaxLength = 255;
  readonly bodyMaxLength = 1000;

  @Input('form') override form!: FormGroup;
  @Input('categories') categories: Array<Category> = [];

  @Output('submitted') submitted = new EventEmitter<{ title: string; body: string; categoryId: string; }>();

  onSubmit() {
    if (this.form.invalid) return;
    this.submitted.emit(this.form.value);
  }
}
