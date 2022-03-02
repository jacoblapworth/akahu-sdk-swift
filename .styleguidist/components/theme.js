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
  base: '#000a1e',
  light: '#404756',
  lightest: '#59606d',
  link: '#0078c8',
  linkActive: '#002a46',
  linkHover: '#003c64',
  button: '#0078c8',
  buttonHover: '#006db7',
  buttonActive: '#0062a6',
  border: '#e8e8e8',
  name: '#7f9a44',
  type: '#b77daa',
  error: '#fff',
  baseBackground: '#fff',
  errorBackground: '#c00',
  codeBackground: '#e6e7e9',
  sidebarBackground: 'rgb(255, 255, 255)',
};

export const fontFamily = {
  base: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
  monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
};

export const fontSize = {
  base: 16,
  text: 15,
  small: 13,
  h1: 28,
  h2: 21,
  h3: 21,
  h4: 17,
  h5: 15,
  h6: 15,
};

export const mq = {
  small: '@media (max-width: 600px)',
};

export const borderRadius = 3;
export const buttonPadding = '5px 12px';
export const buttonFocusDropShadow = '0 0 0 1px #fff, 0 0 0 4px #80bce4';
export const maxWidth = 1000;
export const sidebarWidth = 'calc(16% - 1px);';
