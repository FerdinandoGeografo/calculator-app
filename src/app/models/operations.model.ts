export type Operator = '+' | '-' | '*' | '/';
export type EvalFunction = (a: number, b: number) => number;

export const OPERATIONS: Record<Operator, EvalFunction> = {
  '+': (a, b) => {
    return a + b;
  },
  '-': (a, b) => {
    return a - b;
  },
  '*': (a, b) => {
    return a * b;
  },
  '/': (a, b) => {
    return a / b;
  },
} as const;
