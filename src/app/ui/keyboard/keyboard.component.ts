import { Component, output } from '@angular/core';
import { KeyComponent } from '../key/key.component';
import { Key, KeyConfig, KEYS } from '../../models/key.model';

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
          (onKeyClick)="key.onKeyClick()"
        />
      </li>
      }
    </ul>
  `,
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  keys: KeyConfig[] = KEYS.map((el) => ({
    key: el,
    label:
      el === 'Backspace'
        ? 'DEL'
        : el === 'Reset'
        ? 'RESET'
        : el === '*'
        ? 'x'
        : el,
    severity:
      el === '='
        ? 'tertiary'
        : el === 'Backspace' || el === 'Reset'
        ? 'secondary'
        : 'primary',
    onKeyClick: () => this.onKeyClick.emit(el),
  }));

  onKeyClick = output<Key>();
}
