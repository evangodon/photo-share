import styled from 'styled-components';
import { space } from '@/css/theme';

type MarginBottom = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default styled.h1<{ mb?: MarginBottom }>`
  font-size: var(--fs-xlarge);
  margin-bottom: ${(props) => (props.mb ? space[props.mb] : 0)};
`;
