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
    @use '../../../public/scss/_mixins.scss' as mixins;

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

      &--secondary, &--tertiary {
        font-size: 2.8rem;
        letter-spacing: -0.47px;

        @include mixins.respond(phone) {
          font-size: 2rem;
          letter-spacing: -0.33px;
        }
      }

      &--secondary {
        background: var(--secondary-key-bg);
        color: var(--secondary-key-text);
        box-shadow: var(--secondary-key-shadow);

        &:hover {
          background: var(--secondary-key-bg-hover);
        }
      }

      &--tertiary {
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
