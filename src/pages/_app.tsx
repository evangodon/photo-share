import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { GlobalStyles, theme } from '@/css';
import { createClient, Provider as UrqlProvider } from 'urql';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

// TODO: Update this before pushing to repo
const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => ({
    headers: {
      authorization:
        'Basic Zm5BRHEtSm1lUkFDRWhnYk5hWTN6Mjh3MUNDZnVVWXZzM3RueEVQejpwaG90b3M6c2VydmVy',
    },
  }),
});

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
            <UrqlProvider value={client}>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
                <GlobalStyles />
              </ThemeProvider>
            </UrqlProvider>
          </>
        </StyleSheetManager>
      </>
    );
  }
}
