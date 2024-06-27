import { NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [NgClass],
  template: `
    <button class="key" [ngClass]="keyClass()" (click)="onKeyClick.emit(key())">
      {{ label() }}
    </button>
  `,
  styleUrl: './key.component.scss',
})
export class KeyComponent {
  key = input.required<string>();
  label = input.required<string>();
  severity = input.required<'primary' | 'secondary' | 'tertiary'>();
  onKeyClick = output<string>();
  #active = signal<boolean>(false);

  protected keyClass = computed(() => ({
    'key--primary': this.severity() === 'primary',
    'key--secondary': this.severity() === 'secondary',
    'key--tertiary': this.severity() === 'tertiary',
    'key--active': this.#active(),
  }));

  constructor() {
    fromEvent(document, 'keydown')
      .pipe(
        takeUntilDestroyed(),
        map((e) => (e as KeyboardEvent).key),
        filter((key) => key === this.key())
      )
      .subscribe(() => this.#active.set(true));

    fromEvent(document, 'keyup')
      .pipe(
        takeUntilDestroyed(),
        map((e) => (e as KeyboardEvent).key),
        filter((key) => key === this.key())
      )
      .subscribe((key) => {
        this.#active.set(false);
        this.onKeyClick.emit(key);
      });
  }
}
