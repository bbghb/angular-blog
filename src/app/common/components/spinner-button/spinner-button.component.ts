import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css']
})
export class SpinnerButtonComponent {
  @Input('isLoading') isLoading = false;
  @Input('isDisabled') isDisabled = false;

  @Output('clicked') clicked = new EventEmitter<MouseEvent>();
}
