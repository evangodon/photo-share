import React from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';

type Variant = 'contained' | 'outlined' | 'default';

const backgroundColor = ({ colors }) => ({
  contained: `transparent`,
  outlined: 'transparent',
  default: 'transparent',
});

const color = ({ colors }) => ({
  contained: colors.white,
  outlined: colors.secondary,
  default: colors.secondary,
});

const border = ({ colors }) => ({
  outlined: `2px solid ${colors.secondary}`,
});

const bgImage = ({ colors }) => ({
  contained: `linear-gradient(to right, ${colors.primary} 0%, #4AD0D1 99%)`,
});

const boxShadow = ({ colors }) => ({
  contained: `0 12px 12px -11px ${colors.primary}`,
});

const StyledButton = styled.button<{ ref: any; variant: Variant }>`
  border: 0;
  padding: 0 2.4rem;
  color: ${(props) => color(props.theme)[props.variant]};
  background-color: ${(props) => backgroundColor(props.theme)[props.variant]};
  border: ${(props) => border(props.theme)[props.variant]};
  background-image: ${(props) => bgImage(props.theme)[props.variant]};
  cursor: pointer;
  transition: all 0.1s;
  font-size: var(--fs-medium);
  --height: 4.2rem;
  font-weight: 600;
  line-height: var(--height);
  height: var(--height);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary_light};
    background-position: right center;
  }

  svg {
    color: currentColor;
    margin-right: 0.4rem;
  }
`;

const StyledRipples = styled(Ripples)<{ variant: Variant }>`
  box-shadow: ${(props) => boxShadow(props.theme)[props.variant]};
`;

type Props = {
  color?: string;
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const Button = React.forwardRef(
  ({ children, color, onClick, href, variant = 'default' }: Props, ref) => {
    const linkProps = href ? ({ href, as: 'a' } as const) : {};

    return (
      <StyledRipples variant={variant}>
        <StyledButton
          ref={ref}
          {...linkProps}
          variant={variant}
          onClick={onClick}
        >
          {children}
        </StyledButton>
      </StyledRipples>
    );
  }
);

export default Button;
