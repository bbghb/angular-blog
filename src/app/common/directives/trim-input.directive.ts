import { Directive, forwardRef, HostListener } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appTrimInput]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrimInputDirective),
    multi: true
  }],
})
export class TrimInputDirective extends DefaultValueAccessor {
  @HostListener('input', ['$event.target.value'])
  ngOnChange(value: string) {
    const trimmed = value.trim();
    this.onChange(trimmed);
    if (!trimmed) {
      this.writeValue('');
    }
  };

  @HostListener('blur', ['$event.target.value'])
  applyTrim(value: string) {
    this.writeValue(value.trim());
  }

  override writeValue(value: any) {
    if (typeof value === 'string') {
      value = value.trim();
    }

    super.writeValue(value);
  }
}
