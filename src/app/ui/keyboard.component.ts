import { Component } from '@angular/core';
import { KeyComponent } from './key.component';

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
  styles: `
    @use '../../../public/scss/_mixins.scss' as mixins;

    .keyboard {
      list-style-type: none;
      padding: 3.2rem 3rem;

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 6.4rem;
      column-gap: 2.5rem;
      row-gap: 2.4rem;

      background: var(--bg-board);
      border-radius: 1rem;
      transition: all .4s;

      li:nth-last-child(-n+2) {
        grid-column-end: span 2;
      }

      @include mixins.respond(phone) {
        padding: 2.4rem;
        gap: 1.3rem;
      }
    }
  `,
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
