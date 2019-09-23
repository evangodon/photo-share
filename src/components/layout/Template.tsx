import React, { useState } from 'react';
import { withRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';

const Template = ({ children, router }) => {
  return <AppContainer>{children}</AppContainer>;
};

const AppContainer = styled.div``;

export default withRouter(Template);
