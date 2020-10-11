import React from 'react';
import styled from 'styled-components';
import { space } from '@/css/theme';

type Props = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: var(--app-max-width);
  margin: 0 auto 3rem auto;
  padding-top: ${space[5]};
`;

export default AppContainer;
