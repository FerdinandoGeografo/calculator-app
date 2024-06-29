import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-theme-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="theme-slider">
      <label class="theme-slider__label" for="theme"> Theme </label>

      <div class="theme-slider__box">
        <ul class="theme-slider__markers">
          <li class="theme-slider__mark">1</li>
          <li class="theme-slider__mark">2</li>
          <li class="theme-slider__mark">3</li>
        </ul>

        <input
          class="theme-slider__input"
          type="range"
          min="0"
          max="2"
          [value]="theme()"
          (input)="emitChangeTheme($event)"
        />
      </div>
    </div>
  `,
  styleUrl: './theme-slider.component.scss',
})
export class ThemeSliderComponent {
  theme = input.required<number>();
  onChangeTheme = output<number>();

  emitChangeTheme(e: Event) {
    this.onChangeTheme.emit(+(e.target as HTMLInputElement).value);
  }
}
