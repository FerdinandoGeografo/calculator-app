import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #store = signal<AppState>(initialState);

  themeIndex = computed(() => this.#store().theme);
  theme = computed(() => themes[this.themeIndex()]);

  changeTheme(theme: number) {
    this.#store.update((state) => ({ ...state, theme }));
  }
}

type AppState = { theme: number };

const initialState: AppState = { theme: 0 };

const themes = ['primary', 'secondary', 'tertiary'];

const operations: Record<
  '+' | '-' | '*' | '/',
  (a: number, b: number) => number
> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};
