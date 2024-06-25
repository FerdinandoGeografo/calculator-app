import { Component, inject } from '@angular/core';
import { HeadingBarComponent } from './ui/heading-bar.component';
import { InputBarComponent } from './ui/input-bar.component';
import { KeyboardComponent } from './ui/keyboard.component';
import { DataService } from './data/data.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeadingBarComponent, InputBarComponent, KeyboardComponent],
  template: `
    <main class="main">
      <app-heading-bar />

      <div class="main__content">
        <app-input-bar />

        <app-keyboard />
      </div>
    </main>
  `,
  styles: `
    :host { width: 100%; }

    .main {
      max-width: 54rem;
      width: 100%;
      margin: 0 auto;

      display: flex;
      flex-direction: column;
      gap: 3.2rem;

      &__content {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
      }
    }
  `,
})
export class AppComponent {
  protected store = inject(DataService);
}
