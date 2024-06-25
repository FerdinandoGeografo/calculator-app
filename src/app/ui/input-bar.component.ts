import { Component } from '@angular/core';

@Component({
  selector: 'app-input-bar',
  standalone: true,
  imports: [],
  template: ` <input class="input-bar" type="text" value="399,981" /> `,
  styles: `
    .input-bar {
      width: 100%;
      padding: 4rem 3.2rem 3.6rem;
      background: var(--bg-input);
      border: 0 none;
      border-radius: 1rem;
      outline: 0 none;
      cursor: pointer;

      font-family: inherit;
      font-size: 4rem;
      font-weight: inherit;
      line-height: 5.2rem;
      color: var(--text-color);
      text-align: right;
      transition: all .4s;
    }
  `,
})
export class InputBarComponent {}
