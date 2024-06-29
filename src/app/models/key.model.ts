const KEYS = [
  '7',
  '8',
  '9',
  'Backspace',
  '4',
  '5',
  '6',
  '+',
  '1',
  '2',
  '3',
  '-',
  '.',
  '0',
  '/',
  '*',
  'Reset',
  '=',
] as const;

export type Key = (typeof KEYS)[number];

export type KeyConfig = {
  key: Key;
  label: string;
  severity: 'primary' | 'secondary' | 'tertiary';
};

export const KEY_CONFIGS: KeyConfig[] = KEYS.map((el) => ({
  key: el,
  label:
    el === 'Backspace'
      ? 'DEL'
      : el === 'Reset'
      ? 'RESET'
      : el === '*'
      ? 'x'
      : el,
  severity:
    el === '='
      ? 'tertiary'
      : el === 'Backspace' || el === 'Reset'
      ? 'secondary'
      : 'primary',
}));
