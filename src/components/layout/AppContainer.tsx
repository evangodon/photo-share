import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 144rem;
  padding: 10rem 0;
`;

export default AppContainer;
