import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { GlobalStyles, variables as theme } from 'css';
import { AppContainer } from '@components/layout';

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
        <StyleSheetManager disableVendorPrefixes>
          <>
            <ThemeProvider theme={theme}>
              <AppContainer>
                <Component {...pageProps} />
              </AppContainer>
            </ThemeProvider>
            <GlobalStyles />
          </>
        </StyleSheetManager>
      </>
    );
  }
}
