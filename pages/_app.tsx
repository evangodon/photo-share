import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles, variables as theme } from 'css';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>NextJS Template</title>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} data-testid="hello" />
        </ThemeProvider>
        <GlobalStyles />
      </>
    );
  }
}
