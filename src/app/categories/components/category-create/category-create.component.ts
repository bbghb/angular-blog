import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { CategoriesFormsService } from '../../categories-forms.service';
import { CategoriesService } from '../../categories.service';
import { CREATE_CATEGORY_PAGE_TITLE } from '../../constants';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  private _isCreating$ = new BehaviorSubject<boolean>(false);

  form: FormGroup;
  isCreating$: Observable<boolean>;

  constructor(
    private title: Title,
    private categoriesFormsService: CategoriesFormsService,
    private categoriesService: CategoriesService
  ) {
    this.form = this.categoriesFormsService.createCategoryForm();
    this.isCreating$ = this._isCreating$.asObservable();
    this.title.setTitle(CREATE_CATEGORY_PAGE_TITLE);
  }

  create() {
    if (this.form.invalid) return;

    this._isCreating$.next(true);
    this.categoriesService.createCategory(this.form.value)
      .pipe(finalize(() => this._isCreating$.next(false)))
      .subscribe(this.onCreateSuccess.bind(this));
  }

  private onCreateSuccess() {
    this.form.reset();
  }
}
