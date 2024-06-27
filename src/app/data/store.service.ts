import { computed, effect, Injectable, signal } from '@angular/core';
import { OPERATIONS, Operator } from '../models/operations.model';
import { THEMES } from '../models/theme.model';
import { Key } from '../models/key.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #store = signal<AppState>(initialState);
  #logEffect = effect(() => console.log('State changed:\t', this.#store()));

  themeIndex = computed(() => this.#store().themeIndex);
  theme = computed(() => THEMES[this.themeIndex()]);
  displayed = computed(() => Number.parseFloat(this.#store().displayed));
  operand = computed(() => this.#store().operand);
  #operatorSelected = computed(() => !!this.#store().operator);

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
      case '=':
        this.#eval();
        break;
      default:
        this.#appendKey(key);
    }
  }

  #reset() {
    this.#store.update((state) => ({
      ...state,
      ...initialState,
    }));
  }

  #delete() {
    this.#store.update((state) => ({
      ...state,
      displayed: !this.#operatorSelected()
        ? state.displayed.slice(0, -1)
        : state.operand,
      operand: this.#operatorSelected() ? state.displayed : state.operand,
      operator: this.#operatorSelected() ? undefined : state.operator,
    }));
  }

  #setOperator(operator: Operator) {
    if (operator === this.#store().operator) return;

    this.#store.update((state) => ({
      ...state,
      displayed: state.operand,
      operand: state.displayed,
      operator,
    }));
  }

  #eval() {
    if (!this.#operatorSelected()) return;

    this.#store.update((state) => ({
      ...state,
      displayed: OPERATIONS[state.operator!](
        Number.parseFloat(state.operand),
        Number.parseFloat(state.displayed)
      ).toString(),
      operand: '',
      operator: undefined,
    }));
  }

  #appendKey(key: Key) {
    this.#store.update((state) => ({
      ...state,
      displayed: state.displayed + key,
    }));
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
