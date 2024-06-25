import { Component } from '@angular/core';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [],
  template: `<input class="input-bar" type="number" /> `,
  styles: `
    @use '../../../public/scss/_mixins.scss' as mixins;

    .input-bar {
      height: 12.8rem;
      width: 100%;
      padding: 4rem 3.2rem 3.6rem;
      background: var(--bg-input);
      border: 0 none;
      border-radius: 1rem;
      outline: 0 none;
      cursor: pointer;

      font-family: inherit;
      font-size: 5.6rem;
      font-weight: inherit;
      letter-spacing: -0.93px;
      color: var(--text-color);
      text-align: right;
      transition: all .4s;

      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      @include mixins.respond(phone) {
        height: 8.8rem;
        padding: 2.9rem 2.4rem 2.2rem;
        font-size: 4rem;
        line-height: 3.7rem;
        letter-spacing: -0.67px;
      }
    }
  `,
})
export class InputBarComponent {}
