import { Component } from '@angular/core';
import { KeyComponent } from '../key/key.component';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [KeyComponent],
  template: `
    <ul class="keyboard">
      @for (key of keys; track $index) {
      <li>
        <app-key [key]="key.label" [severity]="key.severity || 'primary'" />
      </li>
      }
    </ul>
  `,
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  keys: {
    label: string;
    severity?: 'primary' | 'secondary' | 'tertiary';
  }[] = [
    {
      label: '7',
    },
    {
      label: '8',
    },
    {
      label: '9',
    },
    {
      label: 'DEL',
      severity: 'secondary',
    },
    {
      label: '4',
    },
    {
      label: '5',
    },
    {
      label: '6',
    },
    {
      label: '+',
    },
    {
      label: '1',
    },
    {
      label: '2',
    },
    {
      label: '3',
    },
    {
      label: '-',
    },
    {
      label: '.',
    },
    {
      label: '0',
    },
    {
      label: '/',
    },
    {
      label: 'x',
    },
    {
      label: 'RESET',
      severity: 'secondary',
    },
    {
      label: '=',
      severity: 'tertiary',
    },
  ];
}
