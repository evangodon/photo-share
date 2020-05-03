import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: 144rem;
  margin: 0 auto;
`;

export default AppContainer;
