import 'styled-components';
import { colors } from './theme';

type Theme = { colors: typeof colors };

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
