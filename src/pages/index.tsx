import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

const IndexPage: NextPage = () => {
  return <Container>Hello NextJs</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 20px;
`;

export default IndexPage;
