import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google client id or secret');
}

/**
 * Google console:
 * https://console.developers.google.com/apis/credentials/oauthclient/750119959072-f3jqre7od0o9dqh4c08g4b1irbgl6thb.apps.googleusercontent.com?project=vim-calendar-282501
 */
const options = {
  site: process.env.SITE ?? 'http://localhost:3004',

  providers: [
    Providers.Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],

  database: process.env.DATABASE_URL,
  pages: {
    signin: '/auth/login',
  },
};

export default (req, res) => NextAuth(req, res, options);
