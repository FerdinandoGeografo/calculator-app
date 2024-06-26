import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [NgClass],
  template: `
    <button class="key" [ngClass]="keyClass()" (click)="onKeyClick.emit(key())">
      {{ key() }}
    </button>
  `,
  styleUrl: './key.component.scss',
})
export class KeyComponent {
  key = input.required<string>();
  severity = input<'primary' | 'secondary' | 'tertiary'>('primary');
  onKeyClick = output<string>();

  protected keyClass = computed(() => ({
    'key--primary': this.severity() === 'primary',
    'key--secondary': this.severity() === 'secondary',
    'key--tertiary': this.severity() === 'tertiary',
  }));
}
