export const THEMES = ['primary', 'secondary', 'tertiary'] as const;
export type Theme = (typeof THEMES)[number];
