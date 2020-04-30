import styled from 'styled-components';
import Ripples from 'react-ripples';

import { transparentize } from 'polished';

const StyledButton = styled.button<{ color?: string }>`
  text-transform: uppercase;
  border: 0;
  background-color: ${(props) =>
    props.color ? props.theme.__color_primary : 'transparent'};
  color: var(--color-primary);
  padding: 0 2.4rem;
  cursor: pointer;
  transition: all 0.1s;
  font-size: var(--fs-small);
  --height: 4.2rem;
  font-weight: 600;
  line-height: var(--height);
  height: var(--height);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: var(--border-radius);

  &:hover {
    background-color: var(--grey-100);
  }

  &:active {
  }

  svg {
    stroke-width: 1;
    color: currentColor;
    width: 1.6rem;
    margin-right: 1rem;
  }
`;

// const Ripples = createRipples({
//   color: 'red',
// });

type Props = {
  color?: string;
  children: React.ReactNode;
};

const Button = ({ children }: Props) => (
  <Ripples color="var(--color-primary-light)">
    <StyledButton>{children}</StyledButton>
  </Ripples>
);

export default Button;
