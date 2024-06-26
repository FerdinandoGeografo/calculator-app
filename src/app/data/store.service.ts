import { computed, effect, Injectable, signal } from '@angular/core';
import { Operator } from '../models/operations.model';
import { THEMES } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #store = signal<AppState>(initialState);
  #logEffect = effect(() => console.log('State changed:\t', this.#store()));

  themeIndex = computed(() => this.#store().themeIndex);
  theme = computed(() => THEMES[this.themeIndex()]);

  changeTheme(index: number) {
    this.#store.update((state) => ({ ...state, themeIndex: index }));
  }
}

type AppState = {
  themeIndex: number;
  displayed: string;
  operator?: Operator;
  operand: string;
};

const initialState: AppState = {
  themeIndex: 0,
  displayed: '',
  operand: '',
};
