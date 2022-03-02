import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractFormComponent } from '../../../common/abstract-form.component';

import { CATEGORY_NAME_MAX_LENGTH, CATEGORY_DESCRIPTION_MAX_LENGTH } from '../../constants';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends AbstractFormComponent {
  readonly nameMaxLength = CATEGORY_NAME_MAX_LENGTH;
  readonly descriptionMaxLength = CATEGORY_DESCRIPTION_MAX_LENGTH;

  @Input('form') override form!: FormGroup;
  @Output('submitted') submitted = new EventEmitter<{ name: string; description: string; }>();

  onSubmit() {
    if (!this.form || this.form.invalid) return;
    this.submitted.emit(this.form.value);
  }
}
