import { Component, input } from '@angular/core';

@Component({
  selector: 'app-result-bar',
  standalone: true,
  imports: [],
  template: `
    <div class="result-bar">
      {{ displayed() }}
    </div>
  `,
  styles: `
    @use "../../../../public/scss/_mixins.scss" as mixins;

    .result-bar {
      padding: 4rem 3.2rem 3.6rem;
      background: var(--bg-result);
      border-radius: 1rem;
      text-align: right;
      transition: all .4s;
      font-size: 5.6rem;
      line-height: 5.2rem;
      letter-spacing: -0.93px;
      color: var(--text-color);
      overflow-x: auto;

      @include mixins.respond(phone) {
        padding: 2.9rem 2.4rem 2.2rem;
        font-size: 4rem;
        line-height: 3.7rem;
        letter-spacing: -0.67px;
      }
    }
  `,
})
export class ResultBarComponent {
  displayed = input.required<string>();
}
