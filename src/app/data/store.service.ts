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
    ...this.#load(),
    themeIndex: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 1
      : 0,
  });

  themeIndex = computed(() => this.#store().themeIndex);
  theme = computed(() => THEMES[this.themeIndex()]);
  #displayedNum = computed(() => parseFloat(this.#store().displayed));
  #operandNum = computed(() => parseFloat(this.#store().operand));
  #operator = computed(() => this.#store().operator);
  prettyDisplayed = computed(() =>
    this.#displayedNum().toLocaleString('en-EN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10,
    })
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
    if (this.#operator()) {
      this.#eval();
    }

    this.#store.update((state) => ({
      ...state,
      operand: state.displayed,
      displayed: '0',
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
    if (!this.#operator()) return;

    const result = OPERATIONS[this.#operator()!](
      this.#operandNum(),
      this.#displayedNum()
    ).toFixed(10);

    this.#store.update((state) => ({
      ...state,
      displayed: (result === 'Infinity' ? 0.0 : parseFloat(result)).toString(),
      operand: '0',
      operator: undefined,
    }));

    this.#save();
  }

  #appendKey(key: Key) {
    if (
      this.#store().displayed.includes('.') &&
      this.#store().displayed.split('.')[1].length >= 10
    )
      return;

    this.#store.update((state) => ({
      ...state,
      displayed: state.displayed === '0' ? key : state.displayed + key,
    }));
  }

  #save() {
    const state = JSON.stringify(this.#store());
    localStorage.setItem('state', state);
  }

  #load() {
    const state = localStorage.getItem('state');
    return state ? (JSON.parse(state) as AppState) : {};
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
