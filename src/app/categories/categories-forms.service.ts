import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from './category.model';
import { CATEGORY_NAME_MAX_LENGTH, CATEGORY_DESCRIPTION_MAX_LENGTH } from './constants';

@Injectable()
export class CategoriesFormsService {
  constructor(private fb: FormBuilder) {}

  createCategoryForm(category?: Category): FormGroup {
    return this.fb.group({
      name: [category?.name || '', [
        Validators.required,
        Validators.maxLength(CATEGORY_NAME_MAX_LENGTH)
      ]],
      description: [category?.description || '', [
        Validators.required,
        Validators.maxLength(CATEGORY_DESCRIPTION_MAX_LENGTH)]
      ]
    });
  }
}
