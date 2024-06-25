import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  #store = signal<GlobalState>({
    theme: 2,
  });

  public theme = computed(() => this.#store().theme);

  #logEffect = effect(() => console.log('State changed:\t', this.#store()));
  #themeEffect = effect(() => {
    document.body.classList.value = themes[this.theme() - 1];
  });

  changeTheme(newTheme: number) {
    if (newTheme > 3) return;
    this.#store.update((state) => ({ ...state, theme: newTheme as 1 | 2 | 3 }));
  }
}

type GlobalState = {
  theme: 1 | 2 | 3;
};

const themes = ['primary', 'secondary', 'tertiary'];
