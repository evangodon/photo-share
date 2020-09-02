import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Ripples from 'react-ripples';
import { transparentize } from 'polished';

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
  contained: `linear-gradient(to right, ${colors.primary_dark} 0%, ${colors.primary} 99%)`,
});

const boxShadow = ({ colors }) => ({
  contained: `0 12px 12px -11px ${colors.primary}`,
});

const StyledButton = styled.button<{ ref: any; variant: Variant; withIcon: boolean }>`
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
  position: relative;

  /* ${(props) => props.withIcon && 'padding-left: 4rem;'} */

  &:hover {
    background-color: ${(props) =>
      transparentize(0.8, String(props.theme.colors.primary_light))};
    background-position: right center;
  }
`;

const StyledRipples = styled(Ripples)<{ variant: Variant }>`
  box-shadow: ${(props) => boxShadow(props.theme)[props.variant]};
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  bottom: 1px;

  svg {
    color: currentColor;
    margin-right: 0.4rem;
  }
`;

type Props = {
  color?: string;
  children: React.ReactNode;
  href?: string;
  as?: string;
  variant?: Variant;
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  icon?: React.ComponentType<any>;
};

/**
 *
 * @param href - Turn button into next Link component
 */
const Button = React.forwardRef(
  (
    { children, color, onClick, href, as, variant = 'default', icon: Icon }: Props,
    ref
  ) => {
    const sharedProps = { ref, variant, withIcon: Boolean(Icon) };

    return (
      <StyledRipples variant={variant}>
        {href ? (
          <Link href={href} as={as}>
            <StyledButton {...sharedProps}>
              {Icon && (
                <IconContainer>
                  <Icon size="18" />
                </IconContainer>
              )}
              {children}
            </StyledButton>
          </Link>
        ) : (
          <StyledButton {...sharedProps} onClick={onClick}>
            {Icon && (
              <IconContainer>
                <Icon size="18" />
              </IconContainer>
            )}
            {children}
          </StyledButton>
        )}
      </StyledRipples>
    );
  }
);

export default Button;
