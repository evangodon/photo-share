import 'styled-components';
import { colors, fontSizes, spaces, shadows } from './theme';

type Theme = {
  colors: typeof colors;
  space: typeof spaces;
  fontSize: typeof fontSizes;
  shadows: typeof shadows;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
