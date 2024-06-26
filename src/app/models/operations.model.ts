export type Operator = '+' | '-' | '*' | '/';
export type EvalFunction = (a: number, b: number) => number;

export const OPERATIONS: Record<Operator, EvalFunction> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};
