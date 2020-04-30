import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div``;

export default AppContainer;
