import 'styled-components';
import { colors, fontSizes, spaces } from './theme';

type Theme = { colors: typeof colors; space: typeof spaces; fontSize: typeof fontSizes };

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
