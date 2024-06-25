import { Component, computed, inject } from '@angular/core';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-theme-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="theme-slider">
      <label class="theme-slider__label" for="theme"> Theme </label>

      <div class="theme-slider__box">
        <datalist class="theme-slider__markers" id="values">
          <option class="theme-slider__mark" value="1" label="1"></option>
          <option class="theme-slider__mark" value="2" label="2"></option>
          <option class="theme-slider__mark" value="3" label="3"></option>
        </datalist>

        <input
          class="theme-slider__input"
          type="range"
          id="theme"
          list="values"
          min="1"
          max="3"
          [value]="this.themeOpt()"
          (input)="changeTheme($event)"
        />
      </div>
    </div>
  `,
  styles: `
    @use '../../../public/scss/_mixins.scss' as mixins;

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

        @include mixins.respond(phone) {
          margin-top: 2.6rem;
        }
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
  protected data = inject(DataService);

  themeOpt = computed(() => this.data.themeIndex() + 1);

  changeTheme(e: Event) {
    this.data.changeTheme(+(e.target as HTMLInputElement).value - 1);
  }
}
