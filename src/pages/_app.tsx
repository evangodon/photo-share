import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { ToastContainer } from '@/components/notifications';
import { createClient, Provider as UrqlProvider } from 'urql';
import { GlobalStyles, theme } from '@/css';
import { AuthProvider } from '@/context/authContext';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

const client = createClient({
  url: '/api/graphql',
  fetchOptions: () => ({ headers: { 'X-Schema-Preview': 'partial-update-mutation' } }),
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
                    <ToastContainer />
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
