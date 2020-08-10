import styled from 'styled-components';
import Ripples from 'react-ripples';

export const Tabs = styled.div`
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;

  .react-ripples:nth-child(even) {
    border-right: 2px solid ${(props) => props.theme.colors.primary};
    border-left: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const Item = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;

  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.primary_dark};
  background-image: ${(props) =>
    props.isActive
      ? `linear-gradient(to right, ${props.theme.colors.primary_dark} 0%, ${props.theme.colors.primary} 99%)`
      : 'none'};

  svg {
    margin-right: 0.6rem;
  }
`;

export const TabItem = ({ children, isActive, ...props }) => (
  <Ripples>
    <Item isActive={isActive} {...props}>
      {children}
    </Item>
  </Ripples>
);
