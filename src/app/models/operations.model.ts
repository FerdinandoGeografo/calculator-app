export type Operator = '+' | '-' | '*' | '/';
export type EvalFunction = (a: number, b: number) => number;

export const OPERATIONS: Record<Operator, EvalFunction> = {
  '+': (a, b) => {
    const res = a + b;
    console.log({
      operand: a,
      displayed: b,
      result: res,
    });

    return res;
  },
  '-': (a, b) => {
    const res = a - b;
    console.log({
      operand: a,
      displayed: b,
      result: res,
    });
    return res;
  },
  '*': (a, b) => {
    const res = a * b;
    console.log({
      operand: a,
      displayed: b,
      result: res,
    });
    return res;
  },
  '/': (a, b) => {
    const res = a / b;
    console.log({
      operand: a,
      displayed: b,
      result: res,
    });
    return res;
  },
} as const;
