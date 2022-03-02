import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { Category } from '../../category.model';
import { CategoriesService } from '../../categories.service';
import { CategoriesFormsService } from '../../categories-forms.service';
import { EDIT_CATEGORY_PAGE_TITLE } from '../../constants';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  private _isEditing$ = new BehaviorSubject<boolean>(false);
  private category: Category;

  form: FormGroup;
  isEditing$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private categoriesService: CategoriesService,
    private categoriesFormsService: CategoriesFormsService
  ) {
    this.category = (this.route.snapshot.data as { category: Category }).category;
    this.form = this.categoriesFormsService.createCategoryForm(this.category);
    this.isEditing$ = this._isEditing$.asObservable();
    this.title.setTitle(EDIT_CATEGORY_PAGE_TITLE);
  }

  edit() {
    if (this.form.invalid) return;

    this._isEditing$.next(true);
    this.categoriesService.updateCategory(this.category.id, this.form.value)
      .pipe(
        finalize(() => this._isEditing$.next(false)),
      )
      .subscribe(this.onEditSuccess.bind(this));
  }

  private onEditSuccess(category: Category) {
    this.category = category;
  }
}
