import { Component, inject } from '@angular/core';

import { ThemeSliderComponent } from './ui/theme-slider/theme-slider.component';
import { ResultBarComponent } from './ui/result-bar/result-bar.component';
import { KeyboardComponent } from './ui/keyboard/keyboard.component';

import { StoreService } from './data/store.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeSliderComponent, ResultBarComponent, KeyboardComponent],
  template: `
    <main class="calculator">
      <div class="calculator__heading">
        <h1 class="calculator__text">calc</h1>

        <app-theme-slider
          [theme]="store.themeIndex()"
          (onChangeTheme)="store.changeTheme($event)"
        />
      </div>

      <div class="calculator__content">
        <app-result-bar [displayed]="store.displayed()" />

        <app-keyboard (onKeyClick)="store.handleKeyClick($event)" />
      </div>
    </main>
  `,
  styleUrl: './app.component.scss',
  host: {
    '[class]': 'store.theme()',
  },
})
export class AppComponent {
  protected store = inject(StoreService);
}
