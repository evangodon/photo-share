import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, variables as theme } from 'css';
import { Template } from '@components/layout';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Photo Share</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Template>
            <Component {...pageProps} />
          </Template>
        </ThemeProvider>
        <GlobalStyles />
      </>
    );
  }
}
