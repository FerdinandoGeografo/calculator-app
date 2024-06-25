import { Component } from '@angular/core';
import { ThemeSliderComponent } from './theme-slider.component';

@Component({
  selector: 'app-heading-bar',
  standalone: true,
  imports: [ThemeSliderComponent],
  template: `
    <div class="heading-bar">
      <h1 class="heading-bar__text">calc</h1>

      <app-theme-slider />
    </div>
  `,
  styles: `
    .heading-bar {
      display: flex;
      justify-content: space-between;

      &__text {
        padding-left: 7px;
        color: var(--text-color);
        font-size: inherit;
        letter-spacing: -0.53px;
        align-self: end;
        transition: color .4s;
      }
    }
  `,
})
export class HeadingBarComponent {}
