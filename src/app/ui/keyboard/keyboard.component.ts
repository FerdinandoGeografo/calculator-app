import { Component, output } from '@angular/core';
import { KeyComponent } from '../key/key.component';
import { Key, KEY_CONFIGS } from '../../models/key.model';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [KeyComponent],
  template: `
    <ul class="keyboard">
      @for (key of keys; track $index) {
      <li>
        <app-key
          [key]="key.key"
          [label]="key.label"
          [severity]="key.severity"
          (onKeyClick)="onKeyClick.emit(key.key)"
        />
      </li>
      }
    </ul>
  `,
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  keys = KEY_CONFIGS;
  onKeyClick = output<Key>();
}
