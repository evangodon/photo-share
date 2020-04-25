import { css } from 'styled-components';

export const variables: { [key: string]: string } = {
  /* Colors */
  __color_primary_light: '#90cdf4',
  __color_primary: '#4299e1',
  __color_primary_dark: '#2b6cb0',
  __color_secondary_light: '#d6bcfa',
  __color_secondary: '#9f7aea',
  __color_secondary_dark: '#6b46c1',

  __white: '#ffffff',
  __black: '#000000',
  __grey_100: '#f7fafc',
  __grey_200: '#edf2f7',
  __grey_300: '#e2e8f0',
  __grey_400: '#cbd5e0',
  __grey_500: '#a0aec0',
  __grey_600: '#718096',
  __grey_700: '#4a5568',
  __grey_800: '#2d3748',
  __grey_900: '#1a202c',

  /* Font-sizes */
  __fs_xsmall: '1rem',
  __fs_small: '1.2rem',
  __fs_medium: '1.4rem',
  __fs_base: '1.6rem',
  __fs_large: '2.8rem',
  __fs_xlarge: '3.6rem',

  __border_radius: '3px',
};

/* Turn js keys into valid css custom properties */
export const customProperties = Object.keys(variables).map(
  (key) => `${[key.replace(/_/g, '-')]}: ${variables[key]};`
);

const sizes: { [key: string]: number } = {
  desktop: 1920,
  tablet: 900,
  mobile: 700,
};

/* Iterate through the sizes and create a media template */
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
    css`
      @media (max-width: ${sizes[label]}px) {
        ${css(literals, ...placeholders)};
      }
    `.join('');
  return acc;
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>);
