import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

type MarginBottom = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const H1 = styled.h1<{ mb?: MarginBottom }>`
  font-size: ${(props) => props.theme.fontSize.__fs_base};
  ${space}
`;

export const H2 = styled.h2<SpaceProps>`
  ${space}
  font-size: ${(props) => props.theme.fontSize.__fs_xlarge};
  font-weight: 400;
`;

export const H3 = styled.h2<SpaceProps>`
  ${space}
  font-size: ${(props) => props.theme.fontSize.__fs_large};
  font-weight: 400;
`;
