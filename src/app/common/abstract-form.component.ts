import { FormControl, FormGroup } from '@angular/forms';

export abstract class AbstractFormComponent {
  form!: FormGroup;

  getFormControl(name: string): FormControl {
    return (this.form as FormGroup).get(name) as FormControl;
  }

  isDirty(formControlName: string): boolean {
    const { dirty, touched } = this.getFormControl(formControlName);
    return dirty || touched;
  }

  hasError(formControlName: string, errorName: string): boolean {
    return this.getFormControl(formControlName).hasError(errorName) && this.isDirty(formControlName);
  }

  isInvalid(formControlName: string): boolean {
    return this.getFormControl(formControlName).invalid && this.isDirty(formControlName);
  }

  isValid(formControlName: string) {
    return this.getFormControl(formControlName).valid && this.isDirty(formControlName);
  }
}
