import { Component, inject } from '@angular/core';

import { ThemeSliderComponent } from './ui/theme-slider/theme-slider.component';
import { ResultBarComponent } from './ui/result-bar/result-bar.component';
import { KeyboardComponent } from './ui/keyboard/keyboard.component';

import { StoreService } from './data/store.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeSliderComponent, ResultBarComponent, KeyboardComponent],
  template: `
    <main class="calculator" @enterAnimation>
      <div class="calculator__heading">
        <h1 class="calculator__text">calc</h1>

        <app-theme-slider
          [theme]="store.themeIndex()"
          (onChangeTheme)="store.changeTheme($event)"
        />
      </div>

      <div class="calculator__content">
        <app-result-bar [displayed]="store.prettyDisplayed()" />

        <app-keyboard (onKeyClick)="store.handleKeyClick($event)" />
      </div>
    </main>
  `,
  styleUrl: './app.component.scss',
  host: {
    '[class]': 'store.theme()',
  },
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, scale: '0.8' }),
        animate(
          '600ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
          style({ opacity: 1, scale: '1' })
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  protected store = inject(StoreService);
}
