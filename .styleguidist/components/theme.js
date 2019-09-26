export const spaceFactor = 8;
export const space = [
  spaceFactor / 2, // 4
  spaceFactor, // 8
  spaceFactor * 2, // 16
  spaceFactor * 3, // 24
  spaceFactor * 4, // 32
  spaceFactor * 5, // 40
  spaceFactor * 6, // 48
];

export const color = {
  base: '#333',
  light: '#999',
  lightest: '#ccc',
  link: '#657483',
  linkHover: '#657483',
  border: '#e8e8e8',
  name: '#7f9a44',
  type: '#b77daa',
  error: '#fff',
  baseBackground: '#fff',
  errorBackground: '#c00',
  codeBackground: '#ebedef',
  sidebarBackground: 'rgb(255, 255, 255)',
};

export const fontFamily = {
  base: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
  monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
};

export const fontSize = {
  base: 15,
  text: 16,
  small: 13,
  h1: 36,
  h2: 24,
  h3: 18,
  h4: 18,
  h5: 16,
  h6: 16,
};

export const mq = {
  small: '@media (max-width: 600px)',
};

export const borderRadius = 3;
export const maxWidth = 1000;
export const sidebarWidth = 'calc(16% - 1px);';
