import { computed, effect, Injectable, signal } from '@angular/core';
import { OPERATIONS, Operator } from '../models/operations.model';
import { THEMES } from '../models/theme.model';
import { Key } from '../models/key.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #store = signal<AppState>({
    ...initialState,
    ...JSON.parse(localStorage.getItem('state') || '{}'),
    themeIndex: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 1
      : 0,
  });

  themeIndex = computed(() => this.#store().themeIndex);
  theme = computed(() => THEMES[this.themeIndex()]);
  displayed = computed(() =>
    Number.parseFloat(this.#store().displayed).toLocaleString()
  );

  constructor() {
    effect(() => {
      console.log('State changed:\t', this.#store());
    });
  }

  changeTheme(index: number) {
    this.#store.update((state) => ({ ...state, themeIndex: index }));
  }

  handleKeyClick(key: Key) {
    switch (key) {
      case 'Reset':
        this.#reset();
        break;
      case 'Backspace':
        this.#delete();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.#setOperator(key as Operator);
        break;
      case '.':
        this.#floatify();
        break;
      case '=':
        this.#eval();
        break;
      default:
        this.#appendKey(key);
    }
  }

  #reset() {
    this.#store.update((state) => ({
      ...initialState,
      themeIndex: state.themeIndex,
    }));
  }

  #delete() {
    this.#store.update((state) => ({
      ...state,
      displayed: state.displayed.slice(0, -1) || '0',
    }));
  }

  #setOperator(operator: Operator) {
    if (!this.#store().operator) {
      this.#store.update((state) => ({
        ...state,
        displayed: '0',
        operand: state.displayed,
      }));
    }

    this.#store.update((state) => ({
      ...state,
      operator,
    }));
  }

  #floatify() {
    this.#store.update((state) => ({
      ...state,
      displayed: state.displayed.includes('.')
        ? state.displayed
        : state.displayed + '.',
    }));
  }

  #eval() {
    if (!this.#store().operator) return;

    this.#store.update((state) => ({
      ...state,
      displayed: OPERATIONS[state.operator!](
        Number.parseFloat(state.operand),
        Number.parseFloat(state.displayed)
      ).toLocaleString(),
      operand: '0',
      operator: undefined,
    }));

    this.#save();
  }

  #appendKey(key: Key) {
    this.#store.update((state) => ({
      ...state,
      displayed: state.displayed + key,
    }));
  }

  #save() {
    const state = JSON.stringify(this.#store());
    localStorage.setItem('state', state);
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
  displayed: '0',
  operand: '0',
  operator: undefined,
};
