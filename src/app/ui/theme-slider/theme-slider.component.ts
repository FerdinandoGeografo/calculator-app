import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-theme-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="theme-slider">
      <label class="theme-slider__label" for="theme"> Theme </label>

      <div class="theme-slider__box">
        <datalist class="theme-slider__markers" id="values">
          <option class="theme-slider__mark" value="0" label="1"></option>
          <option class="theme-slider__mark" value="1" label="2"></option>
          <option class="theme-slider__mark" value="2" label="3"></option>
        </datalist>

        <input
          class="theme-slider__input"
          type="range"
          id="theme"
          list="values"
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
