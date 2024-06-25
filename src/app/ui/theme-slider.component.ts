import { Component, inject } from '@angular/core';
import { GlobalStateService } from '../data/global-state.service';

@Component({
  selector: 'app-theme-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="theme-slider">
      <label class="theme-slider__label" for="theme"> Theme </label>

      <div class="theme-slider__box">
        <datalist class="theme-slider__markers" id="values">
          <option class="theme-slider__mark" value="primary" label="1"></option>
          <option
            class="theme-slider__mark"
            value="secondary"
            label="2"
          ></option>
          <option
            class="theme-slider__mark"
            value="tertiary"
            label="3"
          ></option>
        </datalist>

        <input
          #slider
          class="theme-slider__input"
          type="range"
          id="theme"
          list="values"
          min="1"
          max="3"
          [value]="store.theme()"
          (change)="store.changeTheme(+slider.value)"
        />
      </div>
    </div>
  `,
  styles: `
    .theme-slider {
      display: flex;
      gap: 2.6rem;

      &__label {
        margin-top: 2.4rem;
        color: var(--text-color);
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: color .4s;
      }

      &__box {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      &__input {
        -webkit-appearance: none;
        appearance: none;

        max-width: 7.1rem;
        height: 2.6rem;
        padding-inline: 5px;
        border-radius: 1.3rem;

        background: var(--bg-board);
        outline: none;
        transition: all .4s;

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;

          width: 1.6rem;
          height: 1.6rem;
          background: var(--tertiary-key-bg);
          border-radius: 50%;
          transition: all .4s;
          cursor: pointer;

          &:hover {
            background: var(--tertiary-key-bg-hover);
          }
        }
      }

      &__markers {
        max-height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-inline: 6px;
        color: var(--text-color);
        transition: color .4s;
      }

       &__mark {
        width: 1.2rem;
        text-align: center;
        font-size: 1.2rem;
        font-weight: inherit;
       }
    }
  `,
})
export class ThemeSliderComponent {
  protected store = inject(GlobalStateService);
}
