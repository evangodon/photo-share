import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { createClient, Provider as UrqlProvider } from 'urql';
import { GlobalStyles, theme } from '@/css';
import { AuthProvider } from '@/context/authContext';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

const client = createClient({
  url: '/api/graphql',
});

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Photo Share</title>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <StyleSheetManager disableVendorPrefixes>
          <>
            <UrqlProvider value={client}>
              <NextAuthProvider session={pageProps.session}>
                <AuthProvider>
                  <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                    <GlobalStyles />
                  </ThemeProvider>
                </AuthProvider>
              </NextAuthProvider>
            </UrqlProvider>
          </>
        </StyleSheetManager>
      </>
    );
  }
}
