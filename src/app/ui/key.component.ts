import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [NgClass],
  template: `
    <button class="key" [ngClass]="keyClass()">
      {{ key() }}
    </button>
  `,
  styles: `
    .key {
      width: 100%;
      height: 100%;

      cursor: pointer;
      border: 0 none;
      border-radius: 1rem;
      outline: 0 none;
      font-family: inherit;
      font-weight: inherit;

      transition: all .4s;

      &:active {
        box-shadow: none;
      }

      &--primary {
        font-size: 4rem;
        background: var(--primary-key-bg);
        color: var(--primary-key-text);
        box-shadow: var(--primary-key-shadow);

        &:hover {
          background: var(--primary-key-bg-hover);
        }
      }

      &--secondary {
        font-size: 2.8rem;
        background: var(--secondary-key-bg);
        color: var(--secondary-key-text);
        box-shadow: var(--secondary-key-shadow);

        &:hover {
          background: var(--secondary-key-bg-hover);
        }
      }

      &--tertiary {
        font-size: 2.8rem;
        background: var(--tertiary-key-bg);
        color: var(--tertiary-key-text);
        box-shadow: var(--tertiary-key-shadow);

        &:hover {
          background: var(--tertiary-key-bg-hover);
        }
      }
    }
  `,
})
export class KeyComponent {
  key = input.required<string>();
  severity = input<'primary' | 'secondary' | 'tertiary'>('primary');

  protected keyClass = computed(() => ({
    'key--primary': this.severity() === 'primary',
    'key--secondary': this.severity() === 'secondary',
    'key--tertiary': this.severity() === 'tertiary',
  }));
}
