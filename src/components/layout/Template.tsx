import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const Template = ({ children }: Props) => {
  return <AppContainer>{children}</AppContainer>;
};

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 120rem;
`;

export default Template;
