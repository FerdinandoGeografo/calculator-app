import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [FormsModule],
  template: `<input class="input-bar" type="number" [value]="value()" />`,
  styleUrl: './input-bar.component.scss',
})
export class InputBarComponent {
  value = input.required<number>();
}
